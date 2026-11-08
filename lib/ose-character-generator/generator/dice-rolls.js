/**
 * Rolls a single die with the specified number of sides.
 * @param {number} sides - Number of sides on the die (e.g., 6 for d6).
 * @param {() => number} rng - Returns a random float in [0, 1).
 * @returns {number}
 */
export function rollDie(sides, rng = Math.random) {
    return Math.floor(rng() * sides) + 1;
}

/**
 * Rolls multiple dice and sums the results.
 * @param {number} count - Number of dice to roll.
 * @param {number} sides - Number of sides per die.
 * @param {() => number} rng - Returns a random float in [0, 1).
 * @returns {number}
 */
export function rollDice(count, sides, rng = Math.random) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += rollDie(sides, rng);
    }
    return total;
}
