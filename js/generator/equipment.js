const BROAD_WEAPON_TOKENS = new Set(["blunt", "small", "normal", "missile", "one-handed-melee"]);

const STARTING_EQUIPMENT_PHASES = [
    {
        id: "body-armour",
        roleTags: [],
        targetCount: 1,
        alternatives: ["plate-mail", "chainmail", "leather-armour"],
        fallback: null,
        buyMultiple: false,
        minBudget: 0,
        requires: null,
        ammoMatches: null
    },
    {
        id: "shield",
        roleTags: [],
        targetCount: 1,
        alternatives: ["shield"],
        fallback: null,
        buyMultiple: false,
        minBudget: 10,
        requires: null,
        ammoMatches: null
    },
    {
        id: "melee-weapon",
        roleTags: ["role-melee"],
        targetCount: 1,
        alternatives: ["sword", "short-sword", "battle-axe", "war-hammer", "spear", "club", "dagger", "staff"],
        fallback: "dagger",
        buyMultiple: false,
        minBudget: 2,
        requires: null,
        ammoMatches: null
    },
    {
        id: "ranged-weapon",
        roleTags: ["role-ranged"],
        targetCount: 1,
        alternatives: ["long-bow", "short-bow", "crossbow", "sling"],
        fallback: null,
        buyMultiple: false,
        minBudget: 2,
        requires: null,
        ammoMatches: null
    },
    {
        id: "ammo",
        roleTags: ["role-ammo"],
        targetCount: 2,
        alternatives: ["arrows", "bolts", "sling-stones"],
        fallback: null,
        buyMultiple: true,
        minBudget: 0.25,
        requires: "ranged-weapon",
        ammoMatches: "ranged-weapon"
    },
    {
        id: "container",
        roleTags: ["role-backpack", "role-sack"],
        targetCount: 1,
        alternatives: ["backpack", "sack"],
        fallback: "sack",
        buyMultiple: false,
        minBudget: 1,
        requires: null,
        ammoMatches: null
    },
    {
        id: "food",
        roleTags: ["role-food"],
        targetCount: 2,
        alternatives: ["rations-dry", "rations-fresh"],
        fallback: "rations-fresh",
        buyMultiple: true,
        minBudget: 0.71,
        requires: null,
        ammoMatches: null
    },
    {
        id: "water",
        roleTags: ["role-water"],
        targetCount: 1,
        alternatives: ["waterskin"],
        fallback: null,
        buyMultiple: false,
        minBudget: 1,
        requires: null,
        ammoMatches: null
    },
    {
        id: "light-source",
        roleTags: ["role-light-source"],
        targetCount: 2,
        alternatives: ["torch", "lantern", "candle"],
        fallback: "candle",
        buyMultiple: true,
        minBudget: 0.1,
        requires: null,
        ammoMatches: null
    },
    {
        id: "light-fuel",
        roleTags: ["role-light-fuel"],
        targetCount: 1,
        alternatives: ["oil-flask"],
        fallback: null,
        buyMultiple: true,
        minBudget: 2,
        requires: "light-source",
        ammoMatches: null
    },
    {
        id: "rope",
        roleTags: ["role-rope"],
        targetCount: 1,
        alternatives: ["rope-50"],
        fallback: null,
        buyMultiple: false,
        minBudget: 1,
        requires: null,
        ammoMatches: null
    },
    {
        id: "utility",
        roleTags: ["role-utility"],
        targetCount: 3,
        alternatives: ["flint-steel", "iron-spikes", "chalk-stick"],
        fallback: null,
        buyMultiple: true,
        minBudget: 0.1,
        requires: null,
        ammoMatches: null
    }
];

function toLegalWeaponTags(allowedWeapons) {
    return new Set(
        allowedWeapons
            .filter(token => token.length > 0)
            .map(token => {
                if (token === "all" || token === "none") {
                    return token;
                }

                if (BROAD_WEAPON_TOKENS.has(token)) {
                    return `legality-${token}`;
                }

                return `legality-weapon-${token}`;
            })
    );
}

function toLegalArmourTags(allowedArmour) {
    return new Set(
        allowedArmour
            .filter(token => token.length > 0)
            .map(token => {
                if (token === "all" || token === "none") {
                    return token;
                }

                return `legality-${token}`;
            })
    );
}

function hasForbiddenTag(item, forbiddenTags) {
    return item.tags.some(tag => forbiddenTags.has(tag));
}

function hasAnyRoleTag(item, roleTags) {
    if (roleTags.length === 0) {
        return true;
    }

    return roleTags.some(tag => item.roleTags.includes(tag));
}

function isItemClassLegal(item, allowedWeaponTags, forbiddenWeaponTags, allowedArmourTags, forbiddenArmourTags) {
    if (item.category === "weapon") {
        if (hasForbiddenTag(item, forbiddenWeaponTags)) {
            return false;
        }

        if (allowedWeaponTags.has("all")) {
            return true;
        }

        if (allowedWeaponTags.has("none")) {
            return false;
        }

        return item.tags.some(tag => allowedWeaponTags.has(tag));
    }

    if (item.category === "armour") {
        if (hasForbiddenTag(item, forbiddenArmourTags)) {
            return false;
        }

        if (allowedArmourTags.has("all")) {
            return true;
        }

        if (allowedArmourTags.has("none")) {
            return false;
        }

        return item.tags.some(tag => allowedArmourTags.has(tag));
    }

    return true;
}

/**
 * @param {Object} input
 * @param {import("../OseClass.js").OseClass} input.oseClass
 * @param {number} input.wealth
 * @param {import("../Item.js").Item[]} input.items
 * @returns {{ equipment: import("../Item.js").Item[], wealth: number }}
 */
export function generateEquipment({ oseClass, wealth, items }) {
    const equipment = [];
    const phasePurchases = new Map();
    const itemsById = new Map(items.map(item => [item.id, item]));
    const allowedWeaponTags = toLegalWeaponTags(oseClass.allowedWeapons ?? []);
    const forbiddenWeaponTags = toLegalWeaponTags(oseClass.forbiddenWeapons ?? []);
    const allowedArmourTags = toLegalArmourTags(oseClass.allowedArmour ?? []);
    const forbiddenArmourTags = toLegalArmourTags(oseClass.forbiddenArmour ?? []);

    let remainingWealth = wealth;

    for (const phase of STARTING_EQUIPMENT_PHASES) {
        const minBudget = Number(phase.minBudget ?? 0);
        const requiredPrior = phase.requires ?? null;

        if (remainingWealth < minBudget) {
            continue;
        }

        if (requiredPrior !== null && (phasePurchases.get(requiredPrior)?.length ?? 0) === 0) {
            continue;
        }

        const roleTags = Array.isArray(phase.roleTags) ? phase.roleTags : [];
        const targetCount = Number.isFinite(phase.targetCount) ? phase.targetCount : 1;
        const alternatives = Array.isArray(phase.alternatives) ? phase.alternatives : [];
        const fallback = typeof phase.fallback === "string" && phase.fallback.length > 0 ? phase.fallback : null;
        const buyMultiple = Boolean(phase.buyMultiple);

        let phaseCandidates = items.filter(item => {
            if (!item.startingKitEligible) {
                return false;
            }

            if (!hasAnyRoleTag(item, roleTags)) {
                return false;
            }

            return isItemClassLegal(item, allowedWeaponTags, forbiddenWeaponTags, allowedArmourTags, forbiddenArmourTags);
        });

        if (typeof phase.ammoMatches === "string" && phase.ammoMatches.length > 0) {
            const related = phasePurchases.get(phase.ammoMatches)?.[0] ?? null;
            const relatedAmmoType = related?.ammoType ?? null;

            if (relatedAmmoType === null) {
                continue;
            }

            phaseCandidates = phaseCandidates.filter(item => item.ammoType === relatedAmmoType);
        }

        const candidatesById = new Map(phaseCandidates.map(item => [item.id, item]));
        const purchasedThisPhase = [];
        let remainingTarget = targetCount;

        for (const altId of alternatives) {
            if (remainingTarget <= 0) {
                break;
            }

            const candidate = candidatesById.get(altId);

            if (!candidate) {
                continue;
            }

            if (buyMultiple) {
                while (remainingTarget > 0 && remainingWealth >= candidate.price) {
                    equipment.push(candidate);
                    purchasedThisPhase.push(candidate);
                    remainingTarget -= 1;
                    remainingWealth -= candidate.price;
                }
            } else if (remainingWealth >= candidate.price) {
                equipment.push(candidate);
                purchasedThisPhase.push(candidate);
                remainingTarget -= 1;
                remainingWealth -= candidate.price;
            }
        }

        if (remainingTarget > 0 && fallback !== null) {
            const fallbackItem = itemsById.get(fallback) ?? null;
            const fallbackIsCandidate = fallbackItem !== null && candidatesById.has(fallbackItem.id);

            if (fallbackIsCandidate && remainingWealth >= fallbackItem.price) {
                equipment.push(fallbackItem);
                purchasedThisPhase.push(fallbackItem);
                remainingWealth -= fallbackItem.price;
            }
        }

        phasePurchases.set(phase.id, purchasedThisPhase);
    }

    return {
        equipment,
        wealth: remainingWealth
    };
}
