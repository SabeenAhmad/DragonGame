let xp = 0; //let, var, const better to use let
let health = 100; 
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = []; //array
inventory.push('stick')

const button1 = document.querySelector("#button1") //creates a variable for the html id button1, gets access to element now
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterName")
const monsterHealthText = document.querySelector("#monsterHealth")
const weapons =[
    {
        name : 'Stick',
        power: 5,
    },
    {
        name: 'Dagger',
        power : 30,
    },
    {
        name: 'Clawhammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }

]

const monsters = [
    {
        name: 'Slime',
        level: 2,
        health: 15
    },
    {
        name: 'Beast',
        level: 8,
        health: 60
    },
    {
        name: 'dragon',
        level: 20,
        health: 300
    }
]

const locations =[
    {
        name: "Town Square",
        "button text": ["Go to store","Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave,fightDragon],
        text: "You are in town square. You see a sign that says 'store'."
        //this is a single object     
    },
    {
        name: "Store",
        "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon,goTown],
        text: "You entered the store."
    },

    {
        name: 'Cave',
        "button text": ['Fight slime', 'Fight Beast','Go to Town square'],
        "button functions": [fightSlime,fightBeast,goTown],
        text: 'You entered the cave and see some monsters'

    },
    {
        name: 'Fight',
        "button text": ['Attack', 'Dodge','Run'],
        "button functions": [attack,dodge,goTown],
        text: 'You are fighting a monster'

    },
    {
        name: 'kill monster',
        "button text": ['Go to Town Square', 'Go to Town Square','Go to Town Square'],
        "button functions": [goTown,goTown,goTown],
        text: 'You killed the monster and gained xp and found gold' 
    },
    {
        name: 'lose',
        "button text": ['REPLAY', 'REPLAY','REPLAY'],
        "button functions": [restart,restart,goTown],
        text: 'You died:(' 
    },
      {
        name: 'win',
        "button text": ['REPLAY', 'REPLAY','REPLAY'],
        "button functions": [restart,restart,goTown],
        text:'You win:)' 
      }   
    
]

//initialize buttons,setting onClickbutton
button1.onclick = goStore;
button2.onclick = goCave
button3.onclick = fightDragon

//creating function for goStore,goCave,fightDragon

function update(location){
    monsterStats.style.display = 'none'
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]
    button1.onclick = location["button functions"][0]
    button2.onclick = location["button functions"][1]
    button3.onclick = location["button functions"][2]
    text.innerText = location.text

}
function goTown(){
    update(locations[0]); //passing first element in the array which is town square
}
function goStore(){
    update(locations[1])

}
function goCave(){
    update(locations[2])
}
function goFight(){

    update(locations[3])
    monsterHealth = monsters[fighting].health
    monsterStats.style.display = 'block'
    monsterNameText.innerText = monsters[fighting].name
    monsterName = monsterNameText.innerText
    monsterHealthText.innerText = monsterHealth
}
function buyHealth(){
    if (gold>=10 ){

        gold-= 10
        health+=10
        healthText.innerText = health
        goldText.innerText = gold
    } else{
        text.innerText = 'You do not have enough gold to buy text'
    }
}
function buyWeapon(){
    if (currentWeapon < weapons.length - 1) { //makes sure that the current weapon isn't the most powerful weapon
        if(gold>=30){
            gold-=30
            currentWeapon++ //current weapon is the next weapon in the weapons array
            let newWeapon = weapons[currentWeapon].name //this makes the new weapon = to whatever current weapon index is
            text.innerText = 'You now have a '+ newWeapon
            inventory.push(newWeapon)
            text.innerText = `In your inventory, you now have `+ inventory
            goldText.innerText = gold
    
        } else{
            text.innerText = 'You do not have enough gold to buy a weapon'
        }
    } else {
        text.innerText = 'You already have the most powerful weapon'
        button2.innerText = 'Sell weapon for 15 gold'
        button2.onclick = sellWeapon

    }
}

function sellWeapon(){
    if (inventory.length > 1){
        gold +=15
        goldText.innerText = gold
        let currentWeapon = inventory.shift(); //this new version of current weapon is scoped only in this if statement, removes first element in array and makes it = currentweapon
        text.innerText =`You sold a ${currentWeapon}`
        text.innerText = `You inventory is: ${inventory}`
    } else{
        text.innerText = "Don't sell your only weapon"
    }
}
function fightSlime(){
    fighting = 0
    goFight()
}

function fightBeast(){
    fighting = 1
    goFight()
}

function fightDragon(){
    fighting = 2
    goFight()
}

function dodge(){

}

function attack(){
    text.innerText = `The ${monsters[fighting].name} attacks.`
    text.innerText = `You attack it with you ${weapons[currentWeapon].name}.`
    health -=monsters[fighting].level
    monsters[fighting].health -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) +1 //the monster health will decrease my the weapons power and a random number from 0-1*xp
    monsterHealthText.innerText = monsters[fighting].health
    healthText.innerText = health
    if (health <=0){
        lose()
    }
    else if(monsterHealthText.innerText <=0){
        if (fighting == 2){
            winGame()
        } else{
            defeatMonster()
        }
    }
}
function dodge(){
    text.innerText = `You dodged the attack from the ${monsters[fighting].name}`

}
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level *6.7)
    xp =+monsters[fighting].level
    goldText.innerText = gold
    xpText.innerText = xp 
    update(locations[4])
}
function lose(){
    update(locations[5])
}
function winGame(){
    update(locations[6])
}
function restart(){
    let xp = 0; //let, var, const better to use let
    let health = 100; 
    let gold = 50;
    let currentWeapon = 0;
    let inventory = ['stick']; //array
    xpText.innerText = xp
    healthText.innerText = health
    goldText.innerText = gold
    goTown()
}