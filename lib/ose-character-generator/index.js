import { OseClasses, getOseClasses } from "./ose-classes.js";
import { getAllNames } from "./names.js";
import { getBackgroundTable } from "./backgrounds.js";
import {
    generateCharacter as generateSingleCharacterInternal,
    generateCharacterBatch as generateCharacterBatchInternal
} from "./generator/character-factory.js";

function pickRandom(items, rng) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cannot pick a random item from an empty list.");
    }

    const index = Math.floor(rng() * items.length);
    return items[index];
}

function defaultGetSingleName(gender, rng = Math.random) {
    const possibleNames = getAllNames(gender);
    return pickRandom(possibleNames, rng);
}

function rollSingleBackgroundFromTable(table, rng) {
    const roll = Math.floor(rng() * 100) + 1;
    const entry = table.find(background => roll >= background.min && roll <= background.max) ?? null;

    if (entry === null) {
        throw new Error(`No background entry found for roll ${roll}.`);
    }

    return entry.value;
}

function defaultRollBackground(rng = Math.random) {
    const table = getBackgroundTable();
    const first = rollSingleBackgroundFromTable(table, rng);

    if (first !== "ROLL_TWO") {
        return first;
    }

    const rolledBackgrounds = [];

    while (rolledBackgrounds.length < 2) {
        const next = rollSingleBackgroundFromTable(table, rng);
        if (next !== "ROLL_TWO" && !rolledBackgrounds.includes(next)) {
            rolledBackgrounds.push(next);
        }
    }

    return `${rolledBackgrounds[0]} + ${rolledBackgrounds[1]}`;
}

function normalizeConfig(config) {
    return {
        count: Number.isFinite(config?.count) ? Number(config.count) : 1,
        minScoreTotal: Number.isFinite(config?.minScoreTotal) ? Number(config.minScoreTotal) : 0,
        allowedClassNames: Array.isArray(config?.allowedClassNames) ? config.allowedClassNames : OseClasses.map(oseClass => oseClass.name),
        level: Number.isFinite(config?.level) ? Number(config.level) : 1
    };
}

/**
 * Creates a reusable OSE character generator with overridable randomness and content providers.
 * @param {{
 *   rng?: () => number,
 *   getSingleName?: (gender: "Masculine" | "Feminine", rng: () => number) => string,
 *   rollBackground?: (rng: () => number) => string
 * }} options
 */
export function createOseCharacterGenerator(options = {}) {
    const rng = options.rng ?? Math.random;
    const getSingleName = options.getSingleName ?? defaultGetSingleName;
    const rollBackground = options.rollBackground ?? defaultRollBackground;

    return {
        getAvailableClasses() {
            return [...OseClasses];
        },
        getAvailableClassNames() {
            return OseClasses.map(oseClass => oseClass.name);
        },
        generateCharacter(config) {
            return generateSingleCharacterInternal(normalizeConfig(config), {
                rng,
                getSingleName,
                rollBackground
            });
        },
        generateCharacterBatch(config) {
            return generateCharacterBatchInternal(normalizeConfig(config), {
                rng,
                getSingleName,
                rollBackground
            });
        }
    };
}

/**
 * Stateless convenience helper for one-off batch generation.
 * @param {import("./generator/types.js").GeneratorConfig} config
 * @param {Parameters<typeof createOseCharacterGenerator>[0]} options
 */
export function generateCharacterBatch(config, options = {}) {
    const generator = createOseCharacterGenerator(options);
    return generator.generateCharacterBatch(config);
}

/**
 * Returns a copy of all class names, optionally filtered by source prefix.
 * @param {string[]} [allowedSources]
 */
export function getAvailableClassNames(allowedSources = []) {
    if (!Array.isArray(allowedSources) || allowedSources.length === 0) {
        return OseClasses.map(oseClass => oseClass.name);
    }

    return getOseClasses(allowedSources).map(oseClass => oseClass.name);
}

export { OseClass } from "./OseClass.js";
export { OseClasses } from "./ose-classes.js";
export { getAllNames } from "./names.js";
export { getBackgroundTable } from "./backgrounds.js";
