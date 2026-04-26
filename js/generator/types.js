/**
 * @typedef {{ str: number, int: number, wis: number, dex: number, con: number, cha: number }} AbilityScores
 */

/**
 * @typedef {Object} Character
 * @property {string} name
 * @property {string} pronouns
 * @property {string} gender
 * @property {AbilityScores} scores
 * @property {AbilityScores} modifiers
 * @property {import("../OseClass.js").OseClass} class
 * @property {number} expBonus
 * @property {number} level
 * @property {number} currentXp
 * @property {number | null} nextXp
 * @property {string} alignment
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {string} background
 * @property {string[]} languages
 * @property {"Illiterate" | "Basic" | "Literate"} literacy
 * @property {number} wealth
 */

/**
 * @typedef {Object} GeneratorConfig
 * @property {number} count
 * @property {number} minScoreTotal
 * @property {string[]} allowedClassNames
 * @property {number} level
 */

/**
 * @typedef {Object} GeneratorDeps
 * @property {() => number} rng
 * @property {(gender: string) => string} getSingleName
 * @property {() => string} rollBackground
 */
