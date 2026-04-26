import { rollDice } from "./dice-rolls.js";

/**
 * @param {() => number} rng
 * @returns {import("./types.js").AbilityScores}
 */
export function rollAbilities(rng = Math.random) {
    return {
        str: rollDice(3, 6, rng),
        int: rollDice(3, 6, rng),
        wis: rollDice(3, 6, rng),
        dex: rollDice(3, 6, rng),
        con: rollDice(3, 6, rng),
        cha: rollDice(3, 6, rng)
    };
}

/**
 * Returns the numeric ability score modifier.
 * @param {number} score
 * @returns {number}
 */
export function getModifier(score) {
    if (score === 3) return -3;
    if (score <= 5) return -2;
    if (score <= 8) return -1;
    if (score <= 12) return 0;
    if (score <= 15) return 1;
    if (score <= 17) return 2;
    if (score === 18) return 3;
    throw new RangeError(`Invalid ability score: ${score}`);
}

/**
 * @param {import("./types.js").AbilityScores} abilities
 * @returns {import("./types.js").AbilityScores}
 */
export function getModifiers(abilities) {
    return {
        str: getModifier(abilities.str),
        int: getModifier(abilities.int),
        wis: getModifier(abilities.wis),
        dex: getModifier(abilities.dex),
        con: getModifier(abilities.con),
        cha: getModifier(abilities.cha)
    };
}
