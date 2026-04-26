export const STARTING_EQUIPMENT_POLICY = {
    phases: [
        {
            id: "body-armour",
            roleTags: [],
            targetCount: 1,
            alternatives: ["plate-mail", "chainmail", "leather-armour"],
            fallback: null,
            buyMultiple: false,
            preconditions: { minBudget: 0, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "shield",
            roleTags: [],
            targetCount: 1,
            alternatives: ["shield"],
            fallback: null,
            buyMultiple: false,
            preconditions: { minBudget: 10, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "melee-weapon",
            roleTags: ["role-melee"],
            targetCount: 1,
            alternatives: ["sword", "short-sword", "battle-axe", "war-hammer", "spear", "club", "dagger", "staff"],
            fallback: "dagger",
            buyMultiple: false,
            preconditions: { minBudget: 2, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "ranged-weapon",
            roleTags: ["role-ranged"],
            targetCount: 1,
            alternatives: ["long-bow", "short-bow", "crossbow", "sling"],
            fallback: null,
            buyMultiple: false,
            preconditions: { minBudget: 2, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "ammo",
            roleTags: ["role-ammo"],
            targetCount: 2,
            alternatives: ["arrows", "bolts", "sling-stones"],
            fallback: null,
            buyMultiple: true,
            preconditions: { minBudget: 0.25, requiredPrior: "ranged-weapon" },
            relatesTo: "ranged-weapon"
        },
        {
            id: "container",
            roleTags: ["role-backpack", "role-sack"],
            targetCount: 1,
            alternatives: ["backpack", "sack"],
            fallback: "sack",
            buyMultiple: false,
            preconditions: { minBudget: 1, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "food",
            roleTags: ["role-food"],
            targetCount: 2,
            alternatives: ["rations-dry", "rations-fresh"],
            fallback: "rations-fresh",
            buyMultiple: true,
            preconditions: { minBudget: 0.71, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "water",
            roleTags: ["role-water"],
            targetCount: 1,
            alternatives: ["waterskin"],
            fallback: null,
            buyMultiple: false,
            preconditions: { minBudget: 1, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "light-source",
            roleTags: ["role-light-source"],
            targetCount: 2,
            alternatives: ["torch", "lantern", "candle"],
            fallback: "candle",
            buyMultiple: true,
            preconditions: { minBudget: 0.1, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "light-fuel",
            roleTags: ["role-light-fuel"],
            targetCount: 1,
            alternatives: ["oil-flask"],
            fallback: null,
            buyMultiple: true,
            preconditions: { minBudget: 2, requiredPrior: "light-source" },
            relatesTo: null
        },
        {
            id: "rope",
            roleTags: ["role-rope"],
            targetCount: 1,
            alternatives: ["rope-50"],
            fallback: null,
            buyMultiple: false,
            preconditions: { minBudget: 1, requiredPrior: null },
            relatesTo: null
        },
        {
            id: "utility",
            roleTags: ["role-utility"],
            targetCount: 3,
            alternatives: ["flint-steel", "iron-spikes", "chalk-stick"],
            fallback: null,
            buyMultiple: true,
            preconditions: { minBudget: 0.1, requiredPrior: null },
            relatesTo: null
        }
    ]
};
