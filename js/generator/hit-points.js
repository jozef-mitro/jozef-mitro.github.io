import { rollDie } from "./dice-rolls.js";

/**
 * Rolls HP for level 1, rerolling 1s and 2s (minimum die result is 3).
 * @param {number} hitDie - Size of the hit die (e.g. 6 for d6).
 * @param {number} conModifier - Numeric CON modifier.
 * @param {() => number} rng
 * @returns {number}
 */
export function rollLevelOneHp(hitDie, conModifier, rng = Math.random) {
    const roll = Math.max(3, rollDie(hitDie, rng));
    return roll + conModifier;
}

/**
 * Rolls total HP across all levels. Level 1 rerolls 1s and 2s; higher levels do not.
 * @param {number} level
 * @param {number} hitDie
 * @param {number} conModifier
 * @param {() => number} rng
 * @returns {number}
 */
export function rollTotalHp(level, hitDie, conModifier, rng = Math.random) {
    let total = rollLevelOneHp(hitDie, conModifier, rng);

    for (let i = 2; i <= level; i++) {
        total += rollDie(hitDie, rng) + conModifier;
    }

    return total;
}
