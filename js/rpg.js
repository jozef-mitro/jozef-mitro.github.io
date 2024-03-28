function generateCharacters(event) {
    event.preventDefault();

    let numCharacters = document.getElementById("numCharacters").value;
    let minScoreTotal = document.getElementById("minScoreTotal").value;
    let allowedSources = [];

    if (document.getElementById("sourceClassicFantasy").checked) {
        allowedSources.push("Classic Fantasy");
    }

    if (document.getElementById("sourceAdvancedFantasy").checked) {
        allowedSources.push("Advanced Fantasy");
    }

    if (document.getElementById("sourceCarcassCrawler").checked) {
        allowedSources.push("Carcass Crawler");
    }

    if (document.getElementById("sourceTheNecromancer").checked) {
        allowedSources.push("The Necromancer");
    }

    let characters = [];

    for (let i = 0; i < numCharacters; i++) {
        let character = {};
        character.gender = Math.random() < 0.5 ? "Masculine" : "Feminine";
        character.pronouns = character.gender === "Masculine" ? "He/Him" : "She/Her";
        character.name = getSingleName(character.gender);
        let scoreTotal = 0;

        while (scoreTotal < minScoreTotal) {
            character.scores = {
                str: roll3d6(),
                int: roll3d6(),
                wis: roll3d6(),
                dex: roll3d6(),
                con: roll3d6(),
                cha: roll3d6()
            }

            scoreTotal = Object.values(character.scores).reduce((total, score) => total + score);
        }

        character.modifiers = {
            str: getModifier(character.scores.str),
            int: getModifier(character.scores.int),
            wis: getModifier(character.scores.wis),
            dex: getModifier(character.scores.dex),
            con: getModifier(character.scores.con),
            cha: getModifier(character.scores.cha)
        }

        character.class = getCharacterClass(character.scores, allowedSources);
        character.expBonus = character.class.expBonus;

        characters.push(character);
    }

    let charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";
    characters.forEach(character => {
        charactersElement.innerHTML += `${character.name} [${character.pronouns}]<br>`;
        charactersElement.innerHTML += `Scores: STR ${character.scores.str} (${character.modifiers.str}), INT ${character.scores.int} (${character.modifiers.int}), WIS ${character.scores.wis} (${character.modifiers.wis}), DEX ${character.scores.dex} (${character.modifiers.dex}), CON ${character.scores.con} (${character.modifiers.con}), CHA ${character.scores.cha} (${character.modifiers.cha})<br>`
        // Scores as a tab separated list.
        charactersElement.innerHTML += `${Object.values(character.scores).join("\t")}<br>`;
        charactersElement.innerHTML += `Class: ${character.class.name} (${character.class.source})<br>`;
        charactersElement.innerHTML += `Experience Bonus: ${character.expBonus}%<br><br>`;
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

function getCharacterClass(scores, allowedSources) {
    let availableClasses = getOseClasses(allowedSources);

    // Leave only the classes that the character qualifies for.
    let validClasses = availableClasses.filter(characterClass => {
        if (characterClass.requirements.length === 0) {
            return true;
        }

        return characterClass.requirements.every(score => scores[score] >= 9);
    });

    // Calculate the experience bonus for each valid class.
    validClasses.forEach(characterClass => {
        characterClass.expBonus = getExpBonus(characterClass, scores);
    });

    // Console log the scores.
    console.log(scores);
    // Console log all valid classes and their experience bonuses.
    validClasses.forEach(characterClass => {
        console.log(`${characterClass.name}: ${characterClass.expBonus}`);
    });

    // Leave only the classes with the highest experience bonus.
    let maxExpBonus = Math.max(...validClasses.map(characterClass => characterClass.expBonus));
    validClasses = validClasses.filter(characterClass => characterClass.expBonus === maxExpBonus);

    // If there are multiple classes with the same highest experience bonus, pick one at random.    
    return validClasses[Math.floor(Math.random() * validClasses.length)];
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