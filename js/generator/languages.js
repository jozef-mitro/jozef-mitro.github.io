import { ADDITIONAL_LANGUAGES } from "../constants/languages.js";

/**
 * Picks additional languages randomly from the shared pool, excluding class languages.
 * @param {number} intModifier - Numeric modifier (positive = more languages).
 * @param {string[]} classLanguages - Languages already granted by the class.
 * @param {() => number} rng
 * @returns {string[]}
 */
export function pickAdditionalLanguages(intModifier, classLanguages = [], rng = Math.random) {
    const numAdditional = Math.max(0, intModifier);

    if (numAdditional === 0) {
        return [];
    }

    const picked = [];
    const available = ADDITIONAL_LANGUAGES.filter(lang => !classLanguages.includes(lang));

    for (let i = 0; i < numAdditional && available.length > 0; i++) {
        const index = Math.floor(rng() * available.length);
        picked.push(available[index]);
        available.splice(index, 1);
    }

    return picked;
}

/**
 * Builds the full language list for a character in deterministic order:
 * Common, alignment language, class languages, then additional languages.
 * @param {import("../OseClass.js").OseClass} oseClass
 * @param {string} alignment
 * @param {number} intModifier
 * @param {() => number} rng
 * @returns {string[]}
 */
export function buildLanguages(oseClass, alignment, intModifier, rng = Math.random) {
    const languages = ["Common", alignment];

    if (oseClass.languages && oseClass.languages.length > 0) {
        languages.push(...oseClass.languages);
    }

    const additional = pickAdditionalLanguages(intModifier, oseClass.languages ?? [], rng);
    if (additional.length > 0) {
        languages.push(...additional);
    }

    return languages;
}
