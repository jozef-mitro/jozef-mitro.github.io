/**
 * @param {() => number} rng - Returns a random float in [0, 1).
 * @returns {number}
 */
export function roll3d6(rng = Math.random) {
    let total = 0;
    for (let i = 0; i < 3; i++) {
        total += Math.floor(rng() * 6) + 1;
    }
    return total;
}

/**
 * @param {() => number} rng
 * @returns {import("./types.js").AbilityScores}
 */
export function rollAbilities(rng = Math.random) {
    return {
        str: roll3d6(rng),
        int: roll3d6(rng),
        wis: roll3d6(rng),
        dex: roll3d6(rng),
        con: roll3d6(rng),
        cha: roll3d6(rng)
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
