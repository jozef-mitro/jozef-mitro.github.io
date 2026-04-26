import { rollDice } from "./dice-rolls.js";
import { rollAbilities, getModifiers } from "./ability-scores.js";
import { getEligibleClasses, selectClassByBestExpBonus } from "./class-selection.js";
import { pickAlignment } from "./alignment.js";
import { buildLanguages } from "./languages.js";
import { rollTotalHp } from "./hit-points.js";
import { OseItems } from "../ose-items.js";
import { generateEquipment } from "./equipment.js";

const MAX_REROLL_ATTEMPTS = 1000;

/**
 * @param {number} intelligence
 * @returns {"Illiterate" | "Basic" | "Literate"}
 */
function getLiteracy(intelligence) {
    if (intelligence <= 5) {
        return "Illiterate";
    }

    if (intelligence <= 8) {
        return "Basic";
    }

    return "Literate";
}

/**
 * Generates a single character. Returns null if no valid character could be
 * produced within the allowed number of attempts (e.g. no eligible classes
 * exist for the given constraints).
 * @param {import("./types.js").GeneratorConfig} config
 * @param {import("./types.js").GeneratorDeps} deps
 * @returns {import("./types.js").Character | null}
 */
export function generateCharacter(config, deps) {
    const { minScoreTotal, allowedClassNames, level } = config;
    const { rng, getSingleName, rollBackground } = deps;

    const gender = rng() < 0.5 ? "Masculine" : "Feminine";
    const name = getSingleName(gender);
    const pronouns = gender === "Masculine" ? "He/Him" : "She/Her";

    let abilities = null;
    let classResult = null;
    let alignment = null;

    for (let attempt = 0; attempt < MAX_REROLL_ATTEMPTS; attempt++) {
        const candidateAbilities = rollAbilities(rng);
        const scoreTotal = Object.values(candidateAbilities).reduce((sum, s) => sum + s, 0);

        if (scoreTotal < minScoreTotal) {
            continue;
        }

        const eligible = getEligibleClasses(candidateAbilities, allowedClassNames);
        const candidate = selectClassByBestExpBonus(eligible, candidateAbilities, rng);

        if (candidate === null) {
            continue;
        }

        const candidateAlignment = pickAlignment(candidate.oseClass, rng);

        if (candidateAlignment === null) {
            continue;
        }

        abilities = candidateAbilities;
        classResult = candidate;
        alignment = candidateAlignment;
        break;
    }

    if (abilities === null || classResult === null || alignment === null) {
        return null;
    }

    const modifiers = getModifiers(abilities);
    const { oseClass, expBonus } = classResult;
    const maxHp = rollTotalHp(level, oseClass.hitDie, modifiers.con, rng);
    const languages = buildLanguages(oseClass, alignment, modifiers.int, rng);
    const literacy = getLiteracy(abilities.int);
    const startingWealth = rollDice(3, 6, rng) * 10;
    const equipmentResult = generateEquipment({
        oseClass,
        wealth: startingWealth,
        items: OseItems
    });

    return {
        name,
        pronouns,
        gender,
        scores: abilities,
        modifiers,
        class: oseClass,
        expBonus,
        level,
        currentXp: 0,
        nextXp: oseClass.expTable[level - 1] ?? null,
        alignment,
        maxHp,
        currentHp: maxHp,
        background: rollBackground(),
        languages,
        literacy,
        equipment: equipmentResult.equipment,
        wealth: equipmentResult.wealth
    };
}

/**
 * Generates multiple characters. Characters that could not be generated
 * (null results) are silently dropped.
 * @param {import("./types.js").GeneratorConfig} config
 * @param {import("./types.js").GeneratorDeps} deps
 * @returns {import("./types.js").Character[]}
 */
export function generateCharacterBatch(config, deps) {
    const characters = [];

    for (let i = 0; i < config.count; i++) {
        const character = generateCharacter(config, deps);
        if (character !== null) {
            characters.push(character);
        }
    }

    return characters;
}
