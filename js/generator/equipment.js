const BROAD_WEAPON_TOKENS = new Set(["blunt", "small", "normal", "missile", "one-handed-melee"]);

function normalizeToken(value) {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function roundGold(value) {
    return Math.round(value * 100) / 100;
}

function toLegalWeaponTags(allowedWeapons) {
    return new Set(
        allowedWeapons
            .map(normalizeToken)
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
            .map(normalizeToken)
            .filter(token => token.length > 0)
            .map(token => {
                if (token === "all" || token === "none") {
                    return token;
                }

                return `legality-${token}`;
            })
    );
}

function hasAnyTag(item, tags) {
    if (tags.length === 0) {
        return true;
    }

    return tags.some(tag => item.tags.includes(tag));
}

function hasAnyRoleTag(item, roleTags) {
    if (roleTags.length === 0) {
        return true;
    }

    return roleTags.some(tag => item.roleTags.includes(tag));
}

function isItemClassLegal(item, allowedWeaponTags, allowedArmourTags) {
    if (item.category === "weapon") {
        if (allowedWeaponTags.has("all")) {
            return true;
        }

        if (allowedWeaponTags.has("none")) {
            return false;
        }

        return item.tags.some(tag => allowedWeaponTags.has(tag));
    }

    if (item.category === "armour") {
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

function getItemById(itemsById, id) {
    if (!id) {
        return null;
    }

    return itemsById.get(id) ?? null;
}

/**
 * @param {Object} input
 * @param {import("../OseClass.js").OseClass} input.oseClass
 * @param {number} input.wealth
 * @param {import("../Item.js").Item[]} input.items
 * @param {{ phases: any[] }} input.policy
 * @returns {{ equipment: import("../Item.js").Item[], wealth: number }}
 */
export function generateEquipment({ oseClass, wealth, items, policy }) {
    const equipment = [];
    const phasePurchases = new Map();
    const itemsById = new Map(items.map(item => [item.id, item]));
    const allowedWeaponTags = toLegalWeaponTags(oseClass.allowedWeapons ?? []);
    const allowedArmourTags = toLegalArmourTags(oseClass.allowedArmour ?? []);

    let remainingWealth = roundGold(wealth);

    for (const phase of policy.phases) {
        const preconditions = phase.preconditions ?? {};
        const minBudget = Number(preconditions.minBudget ?? 0);
        const requiredPrior = preconditions.requiredPrior ?? null;

        if (remainingWealth < minBudget) {
            continue;
        }

        if (requiredPrior !== null && (phasePurchases.get(requiredPrior)?.length ?? 0) === 0) {
            continue;
        }

        const legalityTags = Array.isArray(phase.legalityTags) ? phase.legalityTags : [];
        const roleTags = Array.isArray(phase.roleTags) ? phase.roleTags : [];
        const targetCount = Number.isFinite(phase.targetCount) ? phase.targetCount : 1;
        const alternatives = Array.isArray(phase.alternatives) ? phase.alternatives : [];
        const fallback = typeof phase.fallback === "string" && phase.fallback.length > 0 ? phase.fallback : null;
        const buyMultiple = Boolean(phase.buyMultiple);

        let phaseCandidates = items.filter(item => {
            if (!item.startingKitEligible) {
                return false;
            }

            if (!hasAnyTag(item, legalityTags)) {
                return false;
            }

            if (!hasAnyRoleTag(item, roleTags)) {
                return false;
            }

            return isItemClassLegal(item, allowedWeaponTags, allowedArmourTags);
        });

        if (typeof phase.relatesTo === "string" && phase.relatesTo.length > 0) {
            const related = phasePurchases.get(phase.relatesTo)?.[0] ?? null;
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
                while (remainingTarget > 0 && remainingWealth >= candidate.priceGp) {
                    equipment.push(candidate);
                    purchasedThisPhase.push(candidate);
                    remainingTarget -= 1;
                    remainingWealth = roundGold(remainingWealth - candidate.priceGp);
                }
            } else if (remainingWealth >= candidate.priceGp) {
                equipment.push(candidate);
                purchasedThisPhase.push(candidate);
                remainingTarget -= 1;
                remainingWealth = roundGold(remainingWealth - candidate.priceGp);
            }
        }

        if (remainingTarget > 0 && fallback !== null) {
            const fallbackItem = getItemById(itemsById, fallback);
            const fallbackIsCandidate = fallbackItem !== null && candidatesById.has(fallbackItem.id);

            if (fallbackIsCandidate && remainingWealth >= fallbackItem.priceGp) {
                equipment.push(fallbackItem);
                purchasedThisPhase.push(fallbackItem);
                remainingWealth = roundGold(remainingWealth - fallbackItem.priceGp);
            }
        }

        phasePurchases.set(phase.id, purchasedThisPhase);
    }

    return {
        equipment,
        wealth: remainingWealth
    };
}
