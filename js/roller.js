function log() {
    console.log("click");
}

function getFaces() {

    var faces = {
        "bullet1x"  : { "image": "images/dice-symbols/Bullet1x.png", "bullets": 1 },
        "bullet2x"  : { "image": "images/dice-symbols/Bullet2x.png", "bullets": 2 },        
        "smoke"     : { "image": "images/dice-symbols/Smoke.png", "smoke": 1 },
        "explosion" : { "image": "images/dice-symbols/Explosion.png", "explosion": 1 },
        
        "bullet3x"  : { "image": "images/dice-symbols/Bullet3x.png", "bullets": 3 },
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
                faces.bullet1x, faces.bullet1x, faces.rifle, faces.rifle, faces.rifle, faces.crosshair
            ]
        },
        "engineer": {
            faces: [
                faces.bullet1x, faces.bullet1x, faces.rifle, faces.rifle, faces.rifle, faces.crosshair
            ]
        },
    }
}

function clearDices() {
    let parent = document.getElementById("tray");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

function removeDice( dice ) {
    dice.remove();
}

function addDice( type ) {
    let parent = document.getElementById("tray");
    if( parent.children.length < 12 ) {
        var dice = document.createElement("div");
        dice.classList = "dice " + type;
        dice.onclick = function() { removeDice(dice); };
        
        parent.appendChild(dice);
    }    
}
