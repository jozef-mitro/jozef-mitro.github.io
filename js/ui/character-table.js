const PLACEHOLDER = "-";

/**
 * @param {number} modifier - Numeric modifier value.
 * @returns {string}
 */
function formatModifier(modifier) {
    if (modifier > 0) return `+${modifier}`;
    return String(modifier);
}

/**
 * @param {number} score
 * @param {number} modifier
 * @returns {string}
 */
function formatScore(score, modifier) {
    return `${score} (${formatModifier(modifier)})`;
}

/**
 * Column definitions used for both HTML rendering and TSV export.
 * Each entry maps a flat header label to an extractor function.
 * @type {Array<{ header: string, value: (c: import("../generator/types.js").Character) => string | number }>}
 */
const COLUMNS = [
    { header: "Name",        value: c => c.name },
    { header: "Pronouns",    value: c => c.pronouns },
    { header: "Class",       value: c => c.class.name },
    { header: "Alignment",   value: c => c.alignment },
    { header: "Level",       value: c => c.level },
    { header: "Current XP",  value: c => c.currentXp },
    { header: "Next Lvl XP", value: c => c.nextXp ?? PLACEHOLDER },
    { header: "XP Bonus",    value: c => `${c.expBonus}%` },
    { header: "STR",         value: c => formatScore(c.scores.str, c.modifiers.str) },
    { header: "INT",         value: c => formatScore(c.scores.int, c.modifiers.int) },
    { header: "WIS",         value: c => formatScore(c.scores.wis, c.modifiers.wis) },
    { header: "DEX",         value: c => formatScore(c.scores.dex, c.modifiers.dex) },
    { header: "CON",         value: c => formatScore(c.scores.con, c.modifiers.con) },
    { header: "CHA",         value: c => formatScore(c.scores.cha, c.modifiers.cha) },
    { header: "D",           value: c => c.class.saves.death     ?? PLACEHOLDER },
    { header: "W",           value: c => c.class.saves.wand      ?? PLACEHOLDER },
    { header: "P",           value: c => c.class.saves.paralysis ?? PLACEHOLDER },
    { header: "B",           value: c => c.class.saves.breath    ?? PLACEHOLDER },
    { header: "S",           value: c => c.class.saves.spell     ?? PLACEHOLDER },
    { header: "Current HP",  value: c => c.currentHp },
    { header: "Max HP",      value: c => c.maxHp },
    { header: "AC",          value: _ => PLACEHOLDER },
    { header: "Melee AB",    value: _ => PLACEHOLDER },
    { header: "Melee DMG",   value: _ => PLACEHOLDER },
    { header: "Ranged AB",   value: _ => PLACEHOLDER },
    { header: "Ranged DMG",  value: _ => PLACEHOLDER },
    { header: "Range",       value: _ => PLACEHOLDER },
    { header: "Ammo",        value: _ => PLACEHOLDER },
    { header: "Mov",         value: _ => PLACEHOLDER },
    { header: "Background",  value: c => c.background },
    { header: "Languages",   value: c => (c.languages || []).join(", ") },
    { header: "Literacy",    value: c => c.literacy },
    { header: "Notes",       value: _ => PLACEHOLDER }
];

/**
 * Renders a full stat table HTML string from an array of characters.
 * @param {import("../generator/types.js").Character[]} characters
 * @returns {string}
 */
export function renderCharactersTable(characters) {
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
            <th rowspan="2">Literacy</th>
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
        const cells = COLUMNS.map(col => `<td>${col.value(character)}</td>`).join("");
        return `<tr>${cells}</tr>`;
    }).join("");

    return `
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
}

/**
 * Produces a tab-separated values string from an array of characters.
 * Column order matches renderCharactersTable.
 * @param {import("../generator/types.js").Character[]} characters
 * @returns {string}
 */
export function charactersToTsv(characters) {
    return characters.map(character =>
        COLUMNS.map(col => String(col.value(character)).replaceAll(/\s+/g, " ").trim()).join("\t")
    ).join("\n");
}
