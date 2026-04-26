import { OseClasses } from "../ose-classes.js";

/**
 * Returns the classes from OseClasses that the character qualifies for.
 * Does not mutate any OseClass objects.
 * @param {import("./types.js").AbilityScores} abilities
 * @param {string[]} allowedClassNames
 * @returns {import("../OseClass.js").OseClass[]}
 */
export function getEligibleClasses(abilities, allowedClassNames) {
    return OseClasses
        .filter(oseClass => allowedClassNames.includes(oseClass.name))
        .filter(oseClass => {
            const requirements = oseClass.requirements;
            return requirements.length === 0 || requirements.every(score => abilities[score] >= 9);
        });
}

/**
 * Picks the class with the highest XP bonus; breaks ties at random.
 * Does not mutate any OseClass objects.
 * @param {import("../OseClass.js").OseClass[]} eligibleClasses
 * @param {import("./types.js").AbilityScores} abilities
 * @param {() => number} rng
 * @returns {{ oseClass: import("../OseClass.js").OseClass, expBonus: number } | null}
 */
export function selectClassByBestExpBonus(eligibleClasses, abilities, rng = Math.random) {
    if (eligibleClasses.length === 0) {
        return null;
    }

    const withBonus = eligibleClasses.map(oseClass => ({
        oseClass,
        expBonus: oseClass.getExpBonus(abilities)
    }));

    const maxBonus = Math.max(...withBonus.map(entry => entry.expBonus));
    const best = withBonus.filter(entry => entry.expBonus === maxBonus);

    return best[Math.floor(rng() * best.length)];
}
