var dicepool = [];

function getFaces() {

    var faces = {
        "bullet1x"  : { "image": "images/dice-symbols/Bullet1X.png", "bullets": 1 },
        "bullet2x"  : { "image": "images/dice-symbols/Bullet2X.png", "bullets": 2 },        
        "smoke"     : { "image": "images/dice-symbols/Smoke.png", "smoke": 1 },
        "explosion" : { "image": "images/dice-symbols/Explosion.png", "explosion": 1 },
        
        "bullet3x"  : { "image": "images/dice-symbols/Bullet3X.png", "bullets": 3 },
        "grenade"   : { "image": "images/dice-symbols/Grenade.png", "grenade": 1 },
        
        "binoculars": { "image": "images/dice-symbols/Binoculars.png", "binoculars": 1 },
        "knife"     : { "image": "images/dice-symbols/Knife.png", "knife": 1 },

        "crosshair" : { "image": "images/dice-symbols/Crosshair.png", "crosshair": 1 },
        "rifle"     : { "image": "images/dice-symbols/RifleBullet.png", "rifle": 1 },

        "flippers"  : { "image": "images/dice-symbols/Flippers.png", "flippers": 3 },
        "trident"   : { "image": "images/dice-symbols/Trident.png", "trident": 1 },

        "mine"  : { "image": "images/dice-symbols/Bullet3x.png", "mine": 1 },
        "spade"   : { "image": "images/dice-symbols/Grenade.png", "spade": 1 }
    }

    return faces;
}

const faces = getFaces();

function getDiceData() {
            
    var dices = {
        "recruit": {
            faces: [
                faces.bullet1x, faces.bullet1x, faces.smoke, faces.smoke, faces.explosion, faces.explosion
            ]
        },
        "veteran": {
            faces: [
                faces.bullet1x, faces.bullet2x, faces.bullet2x, faces.smoke, faces.explosion, faces.explosion
            ]
        },
        "heavy": {
            faces: [
                faces.bullet2x, faces.smoke, faces.bullet3x, faces.bullet3x, faces.grenade, faces.grenade
            ]
        },
        "recon": {
            faces: [
                faces.bullet2x, faces.bullet2x, faces.binoculars, faces.binoculars, faces.binoculars, faces.knife
            ]
        },
        "sniper": {
            faces: [
                faces.bullet1x, faces.bullet1x, faces.rifle, faces.rifle, faces.rifle, faces.crosshair
            ]
        },
        "diver": {
            faces: [
                faces.bullet1x, faces.bullet1x, faces.flippers, faces.flippers, faces.flippers, faces.trident
            ]
        },
        "engineer": {
            faces: [
                faces.bullet1x, faces.bullet1x, faces.spade, faces.spade, faces.spade, faces.mine
            ]
        },
    }

    return dices;
}

function rollDices() {

    const dicedata = getDiceData();

    dicepool = []; // clear the dice pool

    let dicetray = document.getElementById("tray");
    let rollertray = document.getElementById("roller-tray");

    while (rollertray.firstChild) {
        rollertray.firstChild.remove();
    }

    const dices = Array.from(dicetray.children);
   
    dices.forEach( dice => {

        let type = dice.getAttribute("data-dicetype");
        dicepool.push( structuredClone( dicedata[type] ) );

        let rdice = document.createElement("div");
        rdice.classList = "dice " + type;
        rdice.setAttribute("data-dicetype", type);
        
        rollertray.appendChild(rdice);
        
    });

    // console.log(dicepool);

    let modal = document.getElementById("roller-modal");
    modal.style.display = 'block';

    animateDiceRoll();
}

function closeRoller() {
    let modal = document.getElementById("roller-modal");
    modal.style.display = 'none';
}

function clearDices() {
    let parent = document.getElementById("tray");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
    dicepool = [];
}

function removeDice( dice ) {
    dice.remove();
}

function addDice( type ) {
    let parent = document.getElementById("tray");
    if( parent.children.length < 15 ) {
        var dice = document.createElement("div");
        dice.classList = "dice selectable " + type;
        dice.onclick = function() { removeDice(dice); };
        dice.setAttribute("data-dicetype", type);
        
        parent.appendChild(dice);
    }    
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animateDiceRoll() {

    let id = null;

    let count = 30;
    clearInterval(id);
    id = setInterval(frame, 25);

    function frame() {
      if (--count == 0) {
        
        clearInterval(id);
        
      } else {

        let rollertray = document.getElementById("roller-tray");
        const dices = Array.from(rollertray.children);

        var dicedata = getDiceData();
        
        var rand = 0;
        var image;
   
        dices.forEach( dice => {

            var dicetype = dicedata[dice.getAttribute("data-dicetype")];
            var faces = dicetype.faces;
            
            rand = getRandomIntInclusive(0,5);
            var image = faces[rand].image;
    
            let path = `url("../${ image }")`;
            
            dice.style.backgroundImage = path; 

            // dice.animation="bob 10ms linear infinite";

            // console.log("animating "+rand);
        } );

      }
    }
//    console.log("animateDiceRoll end");
  }
