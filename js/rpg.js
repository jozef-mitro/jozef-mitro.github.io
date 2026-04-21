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
        character.name = getSingleName(character.gender);
        character.pronouns = character.gender === "Masculine" ? "He/Him" : "She/Her";
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
        character.level = 1;
        character.currentXp = 0;
        character.nextXp = 0; // character.class.expTable[character.level];
        // TNL as percentage of progress to next level.
        character.tnl = 100; // Math.round(character.currentXp / character.nextXp * 100);
        character.expBonus = character.class.expBonus;
        // Alignment is randomly chosen from Lawful, Neutral, and Chaotic.
        character.alignment = ["Lawful", "Neutral", "Chaotic"][Math.floor(Math.random() * 3)];
        // Roll hit points for the first level. Reroll 1s and 2s.
        character.maxHp = Math.max(3, Math.floor(Math.random() * character.class.hitDie) + 1) + character.modifiers.con;

        // Roll hit points for the rest of the levels. Don't reroll 1s and 2s.
        for (let j = 2; j <= character.level; j++) {
            character.maxHp += Math.floor(Math.random() * character.class.hitDie) + 1 + character.modifiers.con;
        }

        character.currentHp = character.maxHp;
        characters.push(character);
    }

    const charactersElement = document.getElementById("characters");
    const headers = [
        "Name", "Pronouns", "Class", "Level", "Current XP", "Next XP", "TNL", "XP Bonus", "Alignment",
        "STR", "INT", "WIS", "DEX", "CON", "CHA", "Death", "Wand", "Paralysis", "Breath", "Spell",
        "Current HP", "Max HP", "AC", "AB", "Movement", "Background", "Languages", "Notes"
    ];
    const placeholder = "-";

    const rows = characters.map(character => {
        const cells = [
            character.name,
            character.pronouns,
            character.class.name,
            character.level,
            character.currentXp,
            character.nextXp,
            character.tnl,
            character.expBonus,
            character.alignment,
            `${character.scores.str} (${character.modifiers.str})`,
            `${character.scores.int} (${character.modifiers.int})`,
            `${character.scores.wis} (${character.modifiers.wis})`,
            `${character.scores.dex} (${character.modifiers.dex})`,
            `${character.scores.con} (${character.modifiers.con})`,
            `${character.scores.cha} (${character.modifiers.cha})`,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            character.currentHp,
            character.maxHp,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder
        ];

        return `<tr>${cells.map(value => `<td>${value}</td>`).join("")}</tr>`;
    }).join("");

    charactersElement.innerHTML = `
        <table class="stat-table">
            <thead>
                <tr>${headers.map(header => `<th>${header}</th>`).join("")}</tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
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