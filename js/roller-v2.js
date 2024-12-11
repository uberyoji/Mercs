var dicepool = [];

function getFaceArray() {
    return [
        { 
            "name": "bullet1x",
            "image": "images/dice-symbols/Bullet1X.png", 
            "icon": "images/icons/bullet1x.png", 
            "type": "bullets", "value": 1 
        },
        {
            "name": "bullet2x",
            "image": "images/dice-symbols/Bullet2X.png", 
            "icon": "images/icons/bullet1x.png", 
            "type":"bullets", "value": 2 
        },
        { 
            "name": "smoke",
            "image": "images/dice-symbols/Smoke.png", 
            "icon": "images/icons/bullet1x.png", 
            "type":"smoke", "value": 1 
        },
        { 
            "name": "explosion",
            "image": "images/dice-symbols/Explosion.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"explosion", "value": 1 
        },
        { 
            "name": "bullet3x",
            "image": "images/dice-symbols/Bullet3X.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"bullets", "value": 3 
        },
        {
            "name": "grenade",
            "image": "images/dice-symbols/Grenade.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"grenade", "value": 1 
        },
        { 
            "name": "binoculars",
            "image": "images/dice-symbols/Binoculars.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"binoculars", "value": 1 
        },
        { 
            "name": "knife",
            "image": "images/dice-symbols/Knife.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"knife", "value": 1 
        },
        { 
            "name": "crosshair",
            "image": "images/dice-symbols/Crosshair.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"crosshair", "value": 1 
        },
        { 
            "name": "rifle",
            "image": "images/dice-symbols/RifleBullet.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"rifle", "value": 1 
        },
        { 
            "name": "flippers",
            "image": "images/dice-symbols/Flippers.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"flippers", "value": 1
        },
        {
            "name":  "trident", 
            "image": "images/dice-symbols/Trident.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"trident", "value": 1 
        },
        { 
            "name": "mine",
            "image": "images/dice-symbols/Mine.png", 
            "icon":"images/icons/bullet1x.png", 
            "type":"mine", "value": 1 
        },
        { 
            "name": "spade",
            "image": "images/dice-symbols/Spade.png", 
            "icon": "images/icons/bullet1x.png", 
            "type": "spade", "value": 1 
        }
    ];
}

function getFaces() {

    let faces_array = getFaceArray();

    var faces = {}

    faces_array.forEach( face => { faces[face.name] = face } );
    
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
        "guerilla-ak": {
            faces: [
                faces.bullet1x, faces.bullet1x, faces.bullet2x, faces.bullet2x, faces.bullet2x, faces.bullet2x
            ]
        },
        "guerilla-rpg": {
            faces: [
                faces.bullet1x, faces.explosion, faces.bullet1x, faces.explosion, faces.bullet1x, faces.explosion
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

    dices.forEach(dice => {

        let type = dice.getAttribute("data-dicetype");
        dicepool.push(structuredClone(dicedata[type]));

        let rdice = document.createElement("div");
        rdice.classList.add("dice");
        rdice.classList.add(type);
        rdice.classList.add("selectable");

        rdice.setAttribute("data-dicetype", type);
        rdice.setAttribute("data-dicehold", "roll");        

        rdice.onclick = function () { 
            let val = rdice.getAttribute("data-dicehold");

            if( val == "hold" )
                val = "roll";
            else 
                val = "hold";
            
            rdice.setAttribute("data-dicehold", val );

            if( val == "hold" )
                rdice.classList.add("hold");
            else
                rdice.classList.remove("hold");
        };

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

function removeDice(dice) {
    dice.remove();
}

function addDice(type) {
    let parent = document.getElementById("tray");
    if (parent.children.length < 15) {
        var dice = document.createElement("div");
        dice.classList = "dice selectable " + type;
        dice.onclick = function () { removeDice(dice); };
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

    clearResults();

    let id = null;
    
    clearInterval(id);
    id = setInterval(frame, 15);

    var rollertray = document.getElementById("roller-tray");
    const dices = Array.from(rollertray.children);

    dices.map(dice => { 
        dice.classList.remove("bob-animation"); 

        let val = dice.getAttribute("data-dicehold");
        if( val == "roll" )
            dice.classList.add("roll-fx"); 
    });

    let count = (dices.length) * 12;

    function frame() {

        if (--count == 0) {

            clearInterval(id);

            gatherResults();

        } else {

            var dicedata = getDiceData();
            var rand = 0;
            var dindex = 0;

            dices.forEach(dice => {

                let val = dice.getAttribute("data-dicehold");

                if( val == "roll" ) {

                    if (10*(dices.length - dindex) == count) {

                        dice.classList.add("bob-animation");
                        dice.classList.remove("roll-fx");
                    }
                    else if (10*(dices.length - dindex) < count) {

                        var dicetype = dicedata[dice.getAttribute("data-dicetype")];
                        var faces = dicetype.faces;

                        rand = getRandomIntInclusive(0, 5);
                        var image = faces[rand].image;

                        let path = `url("../${image}")`;

                        dice.style.backgroundImage = path;
                        dice.setAttribute("data-facename", faces[rand].name );         
                    }
                }

                ++dindex;

                // console.log("animating "+rand);
            });

        }
    }

    

    //    console.log("animateDiceRoll end");
}

function clearResults() {
    var resulttray = document.getElementById("results-tray");
    while (resulttray.firstChild) {
        resulttray.firstChild.remove();
    }
    document.getElementById("roller-results").style.display = "none";
}

function gatherResults() {
    var rollertray = document.getElementById("roller-tray");
    const dices = Array.from(rollertray.children);

    const faces = getFaces();
    const face_array = getFaceArray();
    
    var results = {};
    
    face_array.forEach( face => { results[face.type] = 0; } );

    dices.forEach(dice => { 

        let facename = dice.getAttribute("data-facename");

        let face = faces[facename];

        results[face.type] += face.value;
    } );


    var resulttray = document.getElementById("results-tray");
    for( const r in results ) {
        if( results[r] > 0 ) {

            var icon = document.createElement("div");
            icon.classList.add("icon-" + r);
            resulttray.appendChild(icon);

            var value = document.createElement("div");
            value.textContent = "x " + results[r];
            resulttray.appendChild(value);
        }
    }

    document.getElementById("roller-results").style.display = "block";

    // console.log(results);
}
