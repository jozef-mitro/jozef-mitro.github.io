const fs = require("fs");

const EXPECTED_HEADERS = [
    "id",
    "name",
    "category",
    "subcategory",
    "price",
    "source",
    "purchaseUnit",
    "startingKitEligible",
    "notes",
    "weightCoins",
    "tags",
    "roleTags",
    "ammoType",
    "bundleLabel",
    "acBase",
    "shieldBonus",
    "damage",
    "rangeShort",
    "rangeMedium",
    "rangeLong",
    "hands"
];

const ALLOWED_CATEGORIES = new Set(["gear", "weapon", "ammo", "armour", "supply", "tool", "container", "light"]);
const ALLOWED_PURCHASE_UNITS = new Set(["item", "bundle", "use"]);
const ALLOWED_STARTING_KIT = new Set(["yes", "no"]);
const ALLOWED_HANDS = new Set(["", "1", "2", "versatile"]);
const ALLOWED_TAGS = new Set([
    "legality-blunt",
    "legality-small",
    "legality-normal",
    "legality-missile",
    "legality-one-handed-melee",
    "legality-weapon-dagger",
    "legality-weapon-staff",
    "legality-weapon-sword",
    "legality-weapon-short-sword",
    "legality-weapon-polearm",
    "legality-weapon-spear",
    "legality-weapon-club",
    "legality-weapon-sling",
    "legality-weapon-battle-axe",
    "legality-weapon-war-hammer",
    "legality-weapon-mace",
    "legality-weapon-crossbow",
    "legality-weapon-short-bow",
    "legality-weapon-long-bow",
    "legality-leather",
    "legality-chainmail",
    "legality-plate-mail",
    "legality-shield",
    "legality-all"
]);
const ALLOWED_ROLE_TAGS = new Set([
    "role-melee",
    "role-ranged",
    "role-pole-arm",
    "role-food",
    "role-water",
    "role-light-source",
    "role-light-fuel",
    "role-utility",
    "role-rope",
    "role-backpack",
    "role-sack",
    "role-ammo"
]);

function splitCsvLine(line, delimiter = ";") {
    return line.split(delimiter).map(part => part.trim());
}

function escapeJsString(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
}

function parseTagList(value) {
    if (value.length === 0) {
        return [];
    }

    return value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
}

function ensureSlugLikeId(id, rowNumber) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        throw new Error(`Invalid id at row ${rowNumber}: "${id}" must be slug-like.`);
    }
}

function ensureMoney(value, rowNumber) {
    if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
        throw new Error(`Invalid price at row ${rowNumber}: "${value}" must be a non-negative number with up to two decimals.`);
    }
}

function ensureOptionalInt(value, fieldName, rowNumber) {
    if (value.length === 0) {
        return;
    }

    if (!/^\d+$/.test(value)) {
        throw new Error(`Invalid ${fieldName} at row ${rowNumber}: "${value}" must be blank or a non-negative integer.`);
    }
}

function ensureEnum(value, allowedSet, fieldName, rowNumber) {
    if (!allowedSet.has(value)) {
        throw new Error(`Invalid ${fieldName} at row ${rowNumber}: "${value}" is not an allowed value.`);
    }
}

function ensureDamage(value, rowNumber) {
    if (value.length === 0) {
        return;
    }

    if (!/^\d+d\d+(?:[+-]\d+)?$/.test(value)) {
        throw new Error(`Invalid damage at row ${rowNumber}: "${value}" must match XdY or XdY+N/-N.`);
    }
}

function ensureKnownTags(tags, allowedSet, fieldName, rowNumber) {
    for (const tag of tags) {
        if (!allowedSet.has(tag)) {
            throw new Error(`Invalid ${fieldName} tag at row ${rowNumber}: "${tag}" is not recognized.`);
        }
    }
}

function importCsvToJs(inputCsvPath, outputJsPath) {
    const csv = fs.readFileSync(inputCsvPath, "utf8");
    const lines = csv
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (lines.length === 0) {
        throw new Error("CSV file is empty.");
    }

    const header = splitCsvLine(lines[0]);

    if (header.length !== EXPECTED_HEADERS.length || header.some((value, index) => value !== EXPECTED_HEADERS[index])) {
        throw new Error(`Invalid CSV header. Expected: ${EXPECTED_HEADERS.join(";")}`);
    }

    const seenIds = new Set();
    const rows = lines.slice(1).map((line, index) => {
        const rowNumber = index + 2;
        const parts = splitCsvLine(line);

        if (parts.length !== EXPECTED_HEADERS.length) {
            throw new Error(`Invalid CSV row ${rowNumber}. Expected ${EXPECTED_HEADERS.length} fields but got ${parts.length}.`);
        }

        const [
            id,
            name,
            category,
            subcategory,
            price,
            source,
            purchaseUnit,
            startingKitEligible,
            notes,
            weightCoins,
            tagsRaw,
            roleTagsRaw,
            ammoType,
            bundleLabel,
            acBase,
            shieldBonus,
            damage,
            rangeShort,
            rangeMedium,
            rangeLong,
            hands
        ] = parts;

        ensureSlugLikeId(id, rowNumber);

        if (seenIds.has(id)) {
            throw new Error(`Duplicate id at row ${rowNumber}: "${id}"`);
        }

        seenIds.add(id);

        ensureEnum(category, ALLOWED_CATEGORIES, "category", rowNumber);
        ensureMoney(price, rowNumber);
        ensureEnum(purchaseUnit, ALLOWED_PURCHASE_UNITS, "purchaseUnit", rowNumber);
        ensureEnum(startingKitEligible, ALLOWED_STARTING_KIT, "startingKitEligible", rowNumber);
        ensureEnum(hands, ALLOWED_HANDS, "hands", rowNumber);

        ensureOptionalInt(weightCoins, "weightCoins", rowNumber);
        ensureOptionalInt(acBase, "acBase", rowNumber);
        ensureOptionalInt(shieldBonus, "shieldBonus", rowNumber);
        ensureOptionalInt(rangeShort, "rangeShort", rowNumber);
        ensureOptionalInt(rangeMedium, "rangeMedium", rowNumber);
        ensureOptionalInt(rangeLong, "rangeLong", rowNumber);
        ensureDamage(damage, rowNumber);

        if (ammoType.length > 0 && category !== "weapon" && category !== "ammo") {
            throw new Error(`Invalid ammoType at row ${rowNumber}: ammoType is only allowed for weapon or ammo categories.`);
        }

        const tags = parseTagList(tagsRaw);
        const roleTags = parseTagList(roleTagsRaw);

        ensureKnownTags(tags, ALLOWED_TAGS, "tags", rowNumber);
        ensureKnownTags(roleTags, ALLOWED_ROLE_TAGS, "roleTags", rowNumber);

        if ((category === "weapon" || category === "armour") && !tags.some(tag => tag.startsWith("legality-"))) {
            throw new Error(`Invalid tags at row ${rowNumber}: weapon/armour rows must include at least one legality tag.`);
        }

        const outputObject = [
            `id: "${escapeJsString(id)}"`,
            `name: "${escapeJsString(name)}"`,
            `category: "${escapeJsString(category)}"`,
            `subcategory: "${escapeJsString(subcategory)}"`,
            `price: ${Number(price)}`,
            `source: "${escapeJsString(source)}"`,
            `purchaseUnit: "${escapeJsString(purchaseUnit)}"`,
            `startingKitEligible: ${startingKitEligible === "yes"}`,
            `notes: "${escapeJsString(notes)}"`,
            `weightCoins: ${weightCoins.length > 0 ? Number(weightCoins) : "null"}`,
            `tags: [${tags.map(tag => `"${escapeJsString(tag)}"`).join(", ")}]`,
            `roleTags: [${roleTags.map(tag => `"${escapeJsString(tag)}"`).join(", ")}]`,
            `ammoType: ${ammoType.length > 0 ? `"${escapeJsString(ammoType)}"` : "null"}`,
            `bundleLabel: ${bundleLabel.length > 0 ? `"${escapeJsString(bundleLabel)}"` : "null"}`,
            `acBase: ${acBase.length > 0 ? Number(acBase) : "null"}`,
            `shieldBonus: ${shieldBonus.length > 0 ? Number(shieldBonus) : "null"}`,
            `damage: ${damage.length > 0 ? `"${escapeJsString(damage)}"` : "null"}`,
            `rangeShort: ${rangeShort.length > 0 ? Number(rangeShort) : "null"}`,
            `rangeMedium: ${rangeMedium.length > 0 ? Number(rangeMedium) : "null"}`,
            `rangeLong: ${rangeLong.length > 0 ? Number(rangeLong) : "null"}`,
            `hands: ${hands.length > 0 ? `"${escapeJsString(hands)}"` : "null"}`
        ];

        return `    new Item({ ${outputObject.join(", ")} })`;
    });

    const jsOutput = `import { Item } from "./Item.js";\n\nexport const OseItems = [\n${rows.join(",\n")}\n];\n\nexport function getOseItems(allowedSources) {\n    return OseItems.filter(item => allowedSources.some(source => item.source.startsWith(source)));\n}\n`;

    fs.writeFileSync(outputJsPath, jsOutput, "utf8");
}

function printUsage() {
    console.log("Usage:");
    console.log("  node tools/ose-items-csv.js import <input.csv> <output.js>");
    console.log(`  (CSV must contain: ${EXPECTED_HEADERS.join(";")})`);
}

function main() {
    const [, , command, inputPath, outputPath] = process.argv;

    if (!command || !inputPath || !outputPath) {
        printUsage();
        process.exit(1);
    }

    if (command === "import") {
        importCsvToJs(inputPath, outputPath);
        return;
    }

    printUsage();
    process.exit(1);
}

main();
