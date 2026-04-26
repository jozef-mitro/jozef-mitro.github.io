import { getSingleName } from "./names.js";
import { OseClasses } from "./ose-classes.js";
import { rollBackground } from "./backgrounds.js";
import { writeClipboardText } from "./utils.js";

const ADDITIONAL_LANGUAGES = [
    "Arachnid",
    "Deepcommon",
    "Bugbear",
    "Doppelgänger",
    "Dragon",
    "Druidic",
    "Dryad",
    "Dwarvish",
    "Elvish",
    "Fossorial",
    "Gargoyle",
    "Gnoll",
    "Gnomish",
    "Goblin",
    "Halfling",
    "Harpy",
    "Hephaestan",
    "Hobgoblin",
    "Kobold",
    "Lizard man",
    "Lupine",
    "Medusa",
    "Minotaur",
    "Murine",
    "Ogre",
    "Orcish",
    "Pixie",
    "Terran"
];

const ALIGNMENTS = ["Lawful", "Neutral", "Chaotic"];
const SOURCE_CHECKBOXES = [
    { id: "sourceClassicFantasy", source: "Classic Fantasy" },
    { id: "sourceAdvancedFantasy", source: "Advanced Fantasy" },
    { id: "sourceCarcassCrawler", source: "Carcass Crawler" },
    { id: "sourceTheNecromancer", source: "The Necromancer" }
];

document.addEventListener("DOMContentLoaded", () => {
    const characterForm = document.getElementById("characterGeneratorForm");
    const copyCharactersButton = document.getElementById("copyCharacters");

    populateAllowedClasses();
    setupSourceClassSync();

    if (characterForm !== null) {
        characterForm.addEventListener("submit", generateCharacters);
    }

    if (copyCharactersButton !== null) {
        copyCharactersButton.addEventListener("click", copyCharactersTable);
    }
});

function getSourceGroup(sourceText) {
    if (sourceText.startsWith("Classic Fantasy")) {
        return "Classic Fantasy";
    }

    if (sourceText.startsWith("Advanced Fantasy")) {
        return "Advanced Fantasy";
    }

    if (sourceText.startsWith("Carcass Crawler")) {
        return "Carcass Crawler";
    }

    if (sourceText.startsWith("The Necromancer")) {
        return "The Necromancer";
    }

    return "";
}

function setupSourceClassSync() {
    const allowedClassesElement = document.getElementById("allowedClasses");

    SOURCE_CHECKBOXES.forEach(sourceConfig => {
        const sourceCheckbox = document.getElementById(sourceConfig.id);

        if (sourceCheckbox === null) {
            return;
        }

        sourceCheckbox.addEventListener("change", () => {
            sourceCheckbox.indeterminate = false;
            syncClassesForSource(sourceConfig.source, sourceCheckbox.checked);
        });
    });

    if (allowedClassesElement !== null) {
        allowedClassesElement.addEventListener("change", event => {
            const target = event.target;

            if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
                return;
            }

            const sourceName = target.dataset.source || "";

            if (sourceName.length === 0) {
                return;
            }

            updateSourceCheckboxState(sourceName);
        });
    }

    syncAllClassesWithSources();
    updateAllSourceCheckboxStates();
}

function syncClassesForSource(sourceName, isChecked) {
    const allowedClassesElement = document.getElementById("allowedClasses");

    if (allowedClassesElement === null) {
        return;
    }

    const classCheckboxes = allowedClassesElement.querySelectorAll("input[type=\"checkbox\"][data-source]");

    classCheckboxes.forEach(classCheckbox => {
        if (classCheckbox.dataset.source === sourceName) {
            classCheckbox.checked = isChecked;
        }
    });
}

function syncAllClassesWithSources() {
    SOURCE_CHECKBOXES.forEach(sourceConfig => {
        const sourceCheckbox = document.getElementById(sourceConfig.id);

        if (sourceCheckbox === null) {
            return;
        }

        syncClassesForSource(sourceConfig.source, sourceCheckbox.checked);
    });
}

function updateSourceCheckboxState(sourceName) {
    const sourceConfig = SOURCE_CHECKBOXES.find(config => config.source === sourceName);

    if (sourceConfig === undefined) {
        return;
    }

    const sourceCheckbox = document.getElementById(sourceConfig.id);
    const allowedClassesElement = document.getElementById("allowedClasses");

    if (sourceCheckbox === null || allowedClassesElement === null) {
        return;
    }

    const classCheckboxes = Array.from(
        allowedClassesElement.querySelectorAll(`input[type="checkbox"][data-source="${sourceName}"]`)
    );

    if (classCheckboxes.length === 0) {
        sourceCheckbox.checked = false;
        sourceCheckbox.indeterminate = false;
        return;
    }

    const checkedCount = classCheckboxes.filter(classCheckbox => classCheckbox.checked).length;

    if (checkedCount === 0) {
        sourceCheckbox.checked = false;
        sourceCheckbox.indeterminate = false;
        return;
    }

    if (checkedCount === classCheckboxes.length) {
        sourceCheckbox.checked = true;
        sourceCheckbox.indeterminate = false;
        return;
    }

    sourceCheckbox.checked = false;
    sourceCheckbox.indeterminate = true;
}

function updateAllSourceCheckboxStates() {
    SOURCE_CHECKBOXES.forEach(sourceConfig => {
        updateSourceCheckboxState(sourceConfig.source);
    });
}

function populateAllowedClasses() {
    const allowedClassesElement = document.getElementById("allowedClasses");

    if (allowedClassesElement === null) {
        return;
    }

    const sortedClasses = [...OseClasses].sort((a, b) => a.name.localeCompare(b.name));

    allowedClassesElement.innerHTML = sortedClasses.map((oseClass, index) => {
        const classId = `allowedClass${index}`;
        const sourceGroup = getSourceGroup(oseClass.source);

        return `<label for="${classId}"><input type="checkbox" id="${classId}" value="${oseClass.name}" data-source="${sourceGroup}" checked> ${oseClass.name}</label>`;
    }).join("");
}

function pickAdditionalLanguages(intModifier, classLanguages = []) {
    const numAdditional = Math.max(0, parseInt(intModifier));
    
    if (numAdditional === 0) {
        return [];
    }

    const picked = [];
    const available = ADDITIONAL_LANGUAGES.filter(lang => !classLanguages.includes(lang));

    for (let i = 0; i < numAdditional && available.length > 0; i++) {
        const index = Math.floor(Math.random() * available.length);
        picked.push(available[index]);
        available.splice(index, 1);
    }

    return picked;
}

function generateCharacters(event) {
    event.preventDefault();

    let numCharacters = document.getElementById("numCharacters").value;
    let minScoreTotal = document.getElementById("minScoreTotal").value;
    const charactersElement = document.getElementById("characters");
    const allowedClassNames = getAllowedClassNames();

    if (allowedClassNames.length === 0) {
        if (charactersElement !== null) {
            charactersElement.innerHTML = "<p>Select at least one allowed class.</p>";
        }

        setCopyCharactersEnabled(false);
        setCopyCharactersStatus("");
        return;
    }

    let characters = [];

    for (let i = 0; i < numCharacters; i++) {
        let character = {};
        character.gender = Math.random() < 0.5 ? "Masculine" : "Feminine";
        character.name = getSingleName(character.gender);
        character.pronouns = character.gender === "Masculine" ? "He/Him" : "She/Her";
        let scoreTotal = 0;
        let selectedClass = null;

        while (scoreTotal < minScoreTotal || selectedClass === null) {
            character.scores = {
                str: roll3d6(),
                int: roll3d6(),
                wis: roll3d6(),
                dex: roll3d6(),
                con: roll3d6(),
                cha: roll3d6()
            }

            scoreTotal = Object.values(character.scores).reduce((total, score) => total + score);

            if (scoreTotal >= minScoreTotal) {
                selectedClass = getCharacterClass(character.scores, allowedClassNames);
            }
        }

        character.modifiers = {
            str: getModifier(character.scores.str),
            int: getModifier(character.scores.int),
            wis: getModifier(character.scores.wis),
            dex: getModifier(character.scores.dex),
            con: getModifier(character.scores.con),
            cha: getModifier(character.scores.cha)
        }

        character.class = selectedClass;
        character.level = 1;
        character.currentXp = 0;
        character.nextXp = character.class.expTable[character.level - 1]; // expTable[0] is the XP required for level 2, expTable[1] is the XP required for level 3, etc.
        character.expBonus = character.class.expBonus;
        const availableAlignments = ALIGNMENTS.filter(alignment => !(character.class.forbiddenAlignments || []).includes(alignment));
        const alignmentPool = availableAlignments.length > 0 ? availableAlignments : ALIGNMENTS;
        character.alignment = alignmentPool[Math.floor(Math.random() * alignmentPool.length)];
        // Roll hit points for the first level. Reroll 1s and 2s.
        let conModifierNumber = parseInt(character.modifiers.con);
        let hitDieSize = character.class.hitDie;
        character.maxHp = Math.max(3, Math.floor(Math.random() * hitDieSize) + 1) + conModifierNumber;

        // Roll hit points for the rest of the levels. Don't reroll 1s and 2s.
        for (let j = 2; j <= character.level; j++) {
            character.maxHp += Math.floor(Math.random() * hitDieSize) + 1 + conModifierNumber;
        }

        character.currentHp = character.maxHp;
        character.background = rollBackground();
        character.languages = ["Common", character.alignment];

        if (character.class.languages && character.class.languages.length > 0) {
            character.languages.push(...character.class.languages);
        }

        const additionalLanguages = pickAdditionalLanguages(character.modifiers.int, character.class.languages || []);
        if (additionalLanguages.length > 0) {
            character.languages.push(...additionalLanguages);
        }

        characters.push(character);
    }

    const placeholder = "-";

    const superHeaders = `
        <tr>
            <th rowspan="2">Name</th>
            <th rowspan="2">Pronouns</th>
            <th rowspan="2">Class</th>
            <th rowspan="2">Alignment</th>
            <th colspan="4">Experience</th>
            <th colspan="6">Ability Scores</th>
            <th colspan="5">Saving Throws</th>
            <th colspan="2">Hit Points</th>
            <th rowspan="2">AC</th>
            <th colspan="2">Melee</th>
            <th colspan="4">Ranged</th>
            <th rowspan="2">Mov</th>
            <th rowspan="2">Background</th>
            <th rowspan="2">Languages</th>
            <th rowspan="2">Notes</th>
        </tr>`;
    const subHeaders = `
        <tr>
            <th>Level</th><th>Current XP</th><th>Next Lvl XP</th><th>XP Bonus</th>
            <th>STR</th><th>INT</th><th>WIS</th><th>DEX</th><th>CON</th><th>CHA</th>
            <th>D</th><th>W</th><th>P</th><th>B</th><th>S</th>
            <th>Current</th><th>Max</th>
            <th>AB</th><th>DMG</th>
            <th>AB</th><th>DMG</th><th>Range</th><th>Ammo</th>
        </tr>`;

    const rows = characters.map(character => {
        const deathSave = character.class.saves.death ?? placeholder;
        const wandSave = character.class.saves.wand ?? placeholder;
        const paralysisSave = character.class.saves.paralysis ?? placeholder;
        const breathSave = character.class.saves.breath ?? placeholder;
        const spellSave = character.class.saves.spell ?? placeholder;

        const languages = (character.languages || []).join(", ");

        const cells = [
            character.name,
            character.pronouns,
            character.class.name,
            character.alignment,
            character.level,
            character.currentXp,
            character.nextXp,
            character.expBonus + "%",
            `${character.scores.str} (${character.modifiers.str})`,
            `${character.scores.int} (${character.modifiers.int})`,
            `${character.scores.wis} (${character.modifiers.wis})`,
            `${character.scores.dex} (${character.modifiers.dex})`,
            `${character.scores.con} (${character.modifiers.con})`,
            `${character.scores.cha} (${character.modifiers.cha})`,
            deathSave,
            wandSave,
            paralysisSave,
            breathSave,
            spellSave,
            character.currentHp,
            character.maxHp,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            placeholder,
            character.background,
            languages,
            placeholder
        ];

        return `<tr>${cells.map(value => `<td>${value}</td>`).join("")}</tr>`;
    }).join("");

    charactersElement.innerHTML = `
        <table class="stat-table">
            <thead>
                ${superHeaders}
                ${subHeaders}
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

    setCopyCharactersEnabled(characters.length > 0);
    setCopyCharactersStatus("");
}

function getAllowedClassNames() {
    const allowedClassesElement = document.getElementById("allowedClasses");

    if (allowedClassesElement === null) {
        return [];
    }

    return Array.from(
        allowedClassesElement.querySelectorAll("input[type=\"checkbox\"]:checked"),
        checkbox => checkbox.value
    );
}

async function copyCharactersTable() {
    const table = document.querySelector("#characters table");

    if (table === null) {
        setCopyCharactersStatus("Generate characters first.");
        return;
    }

    const tableText = Array.from(table.tBodies[0]?.rows ?? [], row => Array.from(
        row.cells,
        cell => cell.textContent.replaceAll(/\s+/g, " ").trim()
    ).join("\t")).join("\n");

    try {
        await writeClipboardText(tableText);
        setCopyCharactersStatus("Character table copied.");
    } catch (error) {
        console.error("Failed to copy character table.", error);
        setCopyCharactersStatus("Clipboard copy failed.");
    }
}

function setCopyCharactersEnabled(isEnabled) {
    const copyCharactersButton = document.getElementById("copyCharacters");

    if (copyCharactersButton !== null) {
        copyCharactersButton.disabled = !isEnabled;
    }
}

function setCopyCharactersStatus(message) {
    const copyCharactersStatus = document.getElementById("copyCharactersStatus");

    if (copyCharactersStatus !== null) {
        copyCharactersStatus.textContent = message;
    }
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
        console.error("Invalid score: " + score);

        return 0;
    }
}

function getCharacterClass(scores, allowedClassNames) {
    let availableClasses = OseClasses.filter(oseClass => allowedClassNames.includes(oseClass.name));

    // Leave only the classes that the character qualifies for.
    let validClasses = availableClasses.filter(characterClass => {
        let requirements = characterClass.parseRequirements();

        if (requirements.length === 0) {
            return true;
        }

        return requirements.every(score => scores[score] >= 9);
    });

    // Calculate the experience bonus for each valid class.
    validClasses.forEach(characterClass => {
        characterClass.expBonus = characterClass.getExpBonus(scores);
    });

    if (validClasses.length === 0) {
        return null;
    }

    // Leave only the classes with the highest experience bonus.
    let maxExpBonus = Math.max(...validClasses.map(characterClass => characterClass.expBonus));
    validClasses = validClasses.filter(characterClass => characterClass.expBonus === maxExpBonus);

    // If there are multiple classes with the same highest experience bonus, pick one at random.    
    return validClasses[Math.floor(Math.random() * validClasses.length)];
}
