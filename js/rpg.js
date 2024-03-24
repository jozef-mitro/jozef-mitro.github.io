function generateCharacters(event) {
    event.preventDefault();

    let numCharacters = document.getElementById("numCharacters").value;

    // For each character pick a random gender then pick a random name.
    let characters = [];

    for (let i = 0; i < numCharacters; i++) {
        let character = {};
        character.gender = Math.random() < 0.5 ? "Masculine" : "Feminine";
        character.pronouns = character.gender === "Masculine" ? "He/Him" : "She/Her";
        character.name = getSingleName(character.gender);

        character.str = roll3d6();
        character.int = roll3d6();
        character.wis = roll3d6();
        character.dex = roll3d6();
        character.con = roll3d6();
        character.cha = roll3d6();

        character.strMod = getModifier(character.str);
        character.intMod = getModifier(character.int);
        character.wisMod = getModifier(character.wis);
        character.dexMod = getModifier(character.dex);
        character.conMod = getModifier(character.con);
        character.chaMod = getModifier(character.cha);

        let scores = {
            str: character.str,
            int: character.int,
            wis: character.wis,
            dex: character.dex,
            con: character.con,
            cha: character.cha
        }
        character.class = getCharacterClass(scores);

        characters.push(character);
    }

    let charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";
    characters.forEach(character => {
        charactersElement.innerHTML += `${character.name} [${character.pronouns}]<br>`;
        charactersElement.innerHTML += `Str: ${character.str} (${character.strMod}), Int: ${character.int} (${character.intMod}), Wis: ${character.wis} (${character.wisMod}), Dex: ${character.dex} (${character.dexMod}), Con: ${character.con} (${character.conMod}), Cha: ${character.cha} (${character.chaMod})<br>`;
        charactersElement.innerHTML += `Class: ${character.class.name} (${character.class.source})<br>`;
        charactersElement.innerHTML += `Experience Bonus: ${character.class.expBonus}<br><br>`;
    });
}

function roll3d6() {
    let total = 0;
    for (let i = 0; i < 3; i++) {
        total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
}

function getModifier(score) {
    if (score == 3) {
        return "-3";
    } else if (score >= 4 && score <= 5) {
        return "-2";
    } else if (score >= 6 && score <= 8) {
        return "-1";
    } else if (score >= 9 && score <= 12) {
        return "0";
    } else if (score >= 13 && score <= 15) {
        return "+1";
    } else if (score >= 16 && score <= 17) {
        return "+2";
    } else if (score === 18) {
        return "+3";
    } else {
        console.log("Invalid score");

        return 0;
    }
}

// Remove the unused variable 'availableClasses'
// and fill parameters primeFive for each character class.
function getCharacterClass(scores) {
    let availableClasses = [
        { name: "Cleric", requiredScores: [], primeFive: "wis", primeTen: "", source: "Classic Fantasy" },
        { name: "Dwarf", requiredScores: ["con"], primeFive: "str", primeTen: "", source: "Classic Fantasy" },
        { name: "Elf", requiredScores: ["int"], primeFive: "int 13 and str 13", primeTen: "int 16 and str 13", source: "Classic Fantasy" },
        { name: "Fighter", requiredScores: [], primeFive: "str", primeTen: "", source: "Classic Fantasy" },
        { name: "Halfling", requiredScores: ["con", "dex"], primeFive: "dex 13 or str 13", primeTen: "dex 13 and str 13", source: "Classic Fantasy" },
        { name: "Magic-User", requiredScores: [], primeFive: "int", primeTen: "", source: "Classic Fantasy" },
        { name: "Thief", requiredScores: [], primeFive: "dex", primeTen: "", source: "Classic Fantasy" },
        { name: "Acrobat", requiredScores: [], primeFive: "dex", primeTen: "", source: "Advanced Fantasy" },
        { name: "Assassin", requiredScores: [], primeFive: "dex", primeTen: "", source: "Advanced Fantasy" },
        { name: "Barbarian", requiredScores: ["dex"], primeFive: "con 13 or str 13", primeTen: "con 16 and str 16", source: "Advanced Fantasy" },
        { name: "Bard", requiredScores: ["dex", "int"], primeFive: "cha", primeTen: "", source: "Advanced Fantasy" },
        { name: "Drow", requiredScores: ["int"], primeFive: "str 13 and wis 13", primeTen: "str 13 and wis 16", source: "Advanced Fantasy" },
        { name: "Druid", requiredScores: [], primeFive: "wis", primeTen: "", source: "Advanced Fantasy" },
        { name: "Duergar", requiredScores: ["con", "int"], primeFive: "str", primeTen: "", source: "Advanced Fantasy" },
        { name: "Gnome", requiredScores: ["con"], primeFive: "dex 13 and int 13", primeTen: "dex 13 and int 16", source: "Advanced Fantasy" },
        { name: "Half-Elf", requiredScores: ["cha", "con"], primeFive: "int 13 and str 13", primeTen: "int or str 16 and the other 13", source: "Advanced Fantasy" },
        { name: "Half-Orc", requiredScores: [], primeFive: "dex 13 and str 13", primeTen: "dex 16 and str 16", source: "Advanced Fantasy" },
        { name: "Illusionist", requiredScores: ["dex"], primeFive: "int", primeTen: "", source: "Advanced Fantasy" },
        { name: "Knight", requiredScores: ["con", "dex"], primeFive: "str", primeTen: "", source: "Advanced Fantasy" },
        { name: "Paladin", requiredScores: ["cha"], primeFive: "str 13 or wis 13", primeTen: "str 16 and wis 16", source: "Advanced Fantasy" },
        { name: "Ranger", requiredScores: ["con", "wis"], primeFive: "str", primeTen: "", source: "Advanced Fantasy" },
        { name: "Svirfneblin", requiredScores: ["con"], primeFive: "str", primeTen: "", source: "Advanced Fantasy" },
        { name: "Arcane Bard", requiredScores: ["int"], primeFive: "cha 13 and dex 13", primeTen: "cha or dex 16 and the other 13", source: "Carcass Crawler 0" },
        { name: "Beast Master", requiredScores: [], primeFive: "str 13 or wis 13", primeTen: "str 16 and wis 16", source: "Carcass Crawler 0 and 3" },
        { name: "Changeling", requiredScores: ["int"], primeFive: "cha 13 or dex 13", primeTen: "cha 16 and dex 16", source: "Carcass Crawler 0" },
        { name: "Chaos Knight", requiredScores: ["cha"], primeFive: "str 13 or wis 13", primeTen: "str 16 and wis 16", source: "Carcass Crawler 0" },
        { name: "Mage", requiredScores: [], primeFive: "int 13 and wis 13", primeTen: "int 16 and wis 13", source: "Carcass Crawler 0 and 1" },
        { name: "Mutoid", requiredScores: [], primeFive: "dex", primeTen: "", source: "Carcass Crawler 0 and 3" },
        { name: "Mycelian", requiredScores: ["con"], primeFive: "str", primeTen: "", source: "Carcass Crawler 0 and 3" },
        { name: "Warden", requiredScores: ["con", "wis"], primeFive: "str", primeTen: "", source: "Carcass Crawler 0" },
        { name: "Acolyte", requiredScores: [], primeFive: "wis", primeTen: "", source: "Carcass Crawler 1" },
        { name: "Gargantua", requiredScores: ["con", "str"], primeFive: "con 13 and str 13", primeTen: "str 16 and con 13", source: "Carcass Crawler 1" },
        { name: "Goblin", requiredScores: ["dex"], primeFive: "dex 13 or str 13", primeTen: "dex 16 and str 16", source: "Carcass Crawler 1" },
        { name: "Hephaestan", requiredScores: ["cha", "con"], primeFive: "int 13 and wis 13", primeTen: "int 16 and wis 13", source: "Carcass Crawler 1" },
        { name: "Kineticist", requiredScores: [], primeFive: "dex 13 and wis 13", primeTen: "dex 16 and wis 16", source: "Carcass Crawler 1" },
        { name: "Phase Elf", requiredScores: ["int"], primeFive: "int 13 and str 13", primeTen: "int 16 and str 13", source: "Carcass Crawler 2" },
        { name: "Wood Elf", requiredScores: ["dex", "int"], primeFive: "dex 13 and wis 13", primeTen: "dex 16 and wis 13", source: "Carcass Crawler 2" },
        { name: "Dragonborn", requiredScores: ["con", "int"], primeFive: "str", primeTen: "", source: "Carcass Crawler 2" },
        { name: "Tiefling", requiredScores: ["int"], primeFive: "cha 13 or dex 13", primeTen: "cha 16 and dex 16", source: "Carcass Crawler 2" },
        { name: "Necromancer", requiredScores: ["wis"], primeFive: "int", primeTen: "", source: "The Necromancer" }
    ];

    let validClasses = availableClasses.filter(characterClass => {
        if (characterClass.requiredScores.length === 0) {
            return true;
        }

        return characterClass.requiredScores.every(score => scores[score] >= 9);
    });

    // For all valid classes, calculate the experience bonus.
    validClasses.forEach(characterClass => {
        characterClass.expBonus = getExpBonus(characterClass, scores);
    });

    // Console log all valid classes and their experience bonuses.
    validClasses.forEach(characterClass => {
        console.log(`${characterClass.name}: ${characterClass.expBonus}`);
    });

    // Leave only the classes with the highest experience bonus.
    let maxExpBonus = Math.max(...validClasses.map(characterClass => characterClass.expBonus));
    validClasses = validClasses.filter(characterClass => characterClass.expBonus === maxExpBonus);

    // If there are multiple classes with the same highest experience bonus, pick one at random.
    let index = Math.floor(Math.random() * validClasses.length);
    return validClasses[index];
}

function getExpBonus(classData, scores) {
    let primeFive = classData.primeFive;
    let primeTen = classData.primeTen;

    if (!primeTen) {
        if (scores[primeFive] >= 16) {
            return 10;
        } else if (scores[primeFive] >= 13) {
            return 5;
        } else {
            return 0;
        }
    } else {
        if (primeTen.includes("or")) {
            // Split the primeTen string into an array of words.
            let primeTenWords = primeTen.split(" ");
            let score1 = primeTenWords[0];
            let score2 = primeTenWords[2];

            // If either score is 16 or higher and the other is 13 or higher, return 10.
            if ((scores[score1] >= 16 && scores[score2] >= 13) || (scores[score1] >= 13 && scores[score2] >= 16)) {
                return 10;
            }
        } else if (primeTen.includes("and")) {
            // Split the primeTen string into an array of words.
            let primeTenWords = primeTen.split(" ");
            let score1 = primeTenWords[0];
            let score1Min = parseInt(primeTenWords[1]);
            let score2 = primeTenWords[3];
            let score2Min = parseInt(primeTenWords[4]);

            if (scores[score1] >= score1Min && scores[score2] >= score2Min) {
                return 10;
            }
        } else {
            console.log("Invalid primeTen");
        }

        let primeFiveWords = primeFive.split(" ");
        let fiveFirst = primeFiveWords[0];
        let fiveFirstMin = parseInt(primeFiveWords[1]);
        let fiveOperator = primeFiveWords[2];
        let fiveSecond = primeFiveWords[3];
        let fiveSecondMin = parseInt(primeFiveWords[4]);

        if (fiveOperator === "or") {
            if (scores[fiveFirst] >= fiveFirstMin || scores[fiveSecond] >= fiveSecondMin) {
                return 5;
            }
        } else if (fiveOperator === "and") {
            if (scores[fiveFirst] >= fiveFirstMin && scores[fiveSecond] >= fiveSecondMin) {
                return 5;
            }
        } else {
            console.log("Invalid primeFive");
        }

        return 0;
    }
}

function generateNames(event) {
    event.preventDefault();
    
    let numNames = document.getElementById("numNames").value;
    let nameType = document.getElementById("nameType").value;
    let possibleNames = getAllNames(nameType);
    let pickedNames = [];

    for (let i = 0; i < numNames; i++) {
        let index = Math.floor(Math.random() * possibleNames.length);
        pickedNames.push(possibleNames[index]);
        possibleNames.splice(index, 1);
    }

    let namesElement = document.getElementById("names");
    namesElement.innerHTML = pickedNames.join("<br>");
}