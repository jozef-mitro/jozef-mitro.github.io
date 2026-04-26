import { ALIGNMENTS } from "../constants/alignments.js";

/**
 * @param {import("../OseClass.js").OseClass} oseClass
 * @returns {string[]}
 */
export function getAllowedAlignments(oseClass) {
    const forbidden = oseClass.forbiddenAlignments ?? [];
    return ALIGNMENTS.filter(a => !forbidden.includes(a));
}

/**
 * Picks a random allowed alignment. Returns null when all alignments are forbidden
 * (caller should treat null as a signal to reroll the entire character).
 * @param {import("../OseClass.js").OseClass} oseClass
 * @param {() => number} rng
 * @returns {string | null}
 */
export function pickAlignment(oseClass, rng = Math.random) {
    const allowed = getAllowedAlignments(oseClass);
    if (allowed.length === 0) {
        return null;
    }
    return allowed[Math.floor(rng() * allowed.length)];
}
