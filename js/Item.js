export class Item {
    /**
     * @param {Object} data
     * @param {string} data.id
     * @param {string} data.name
     * @param {string} data.category
     * @param {string} data.subcategory
     * @param {number} data.price
     * @param {string} data.source
     * @param {string} data.purchaseUnit
     * @param {boolean} data.startingKitEligible
     * @param {string} data.notes
     * @param {number | null} [data.weightCoins]
     * @param {string[]} [data.tags]
     * @param {string[]} [data.roleTags]
     * @param {string | null} [data.ammoType]
     * @param {string | null} [data.bundleLabel]
     * @param {number | null} [data.acBase]
     * @param {number | null} [data.shieldBonus]
     * @param {string | null} [data.damage]
     * @param {number | null} [data.rangeShort]
     * @param {number | null} [data.rangeMedium]
     * @param {number | null} [data.rangeLong]
     * @param {"1" | "2" | "versatile" | null} [data.hands]
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.subcategory = data.subcategory;
        this.price = data.price;
        this.source = data.source;
        this.purchaseUnit = data.purchaseUnit;
        this.startingKitEligible = data.startingKitEligible;
        this.notes = data.notes;

        this.weightCoins = data.weightCoins ?? null;
        this.tags = Array.isArray(data.tags) ? data.tags : [];
        this.roleTags = Array.isArray(data.roleTags) ? data.roleTags : [];
        this.ammoType = data.ammoType ?? null;
        this.bundleLabel = data.bundleLabel ?? null;

        this.acBase = data.acBase ?? null;
        this.shieldBonus = data.shieldBonus ?? null;
        this.damage = data.damage ?? null;
        this.rangeShort = data.rangeShort ?? null;
        this.rangeMedium = data.rangeMedium ?? null;
        this.rangeLong = data.rangeLong ?? null;
        this.hands = data.hands ?? null;
    }
}
