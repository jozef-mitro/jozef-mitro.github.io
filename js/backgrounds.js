const ROLL_TWO = "ROLL_TWO";

const BACKGROUND_TABLE = [
    { min: 1, max: 3, value: "Animal trainer" },
    { min: 4, max: 5, value: "Armourer" },
    { min: 6, max: 9, value: "Baker" },
    { min: 10, max: 12, value: "Blacksmith" },
    { min: 13, max: 13, value: "Bookbinder" },
    { min: 14, max: 16, value: "Bowyer / fletcher" },
    { min: 17, max: 20, value: "Brewer" },
    { min: 21, max: 23, value: "Butcher" },
    { min: 24, max: 26, value: "Carpenter" },
    { min: 27, max: 28, value: "Chandler" },
    { min: 29, max: 33, value: "Cooper" },
    { min: 34, max: 35, value: "Coppersmith" },
    { min: 36, max: 46, value: "Farmer" },
    { min: 47, max: 50, value: "Fisher" },
    { min: 51, max: 54, value: "Furrier" },
    { min: 55, max: 55, value: "Glassblower" },
    { min: 56, max: 59, value: "Huntsman" },
    { min: 60, max: 62, value: "Lapidary / jeweller" },
    { min: 63, max: 66, value: "Lorimer" },
    { min: 67, max: 67, value: "Mapmaker" },
    { min: 68, max: 69, value: "Mason" },
    { min: 70, max: 73, value: "Miner" },
    { min: 74, max: 76, value: "Potter" },
    { min: 77, max: 78, value: "Roper" },
    { min: 79, max: 81, value: "Seafarer" },
    { min: 82, max: 84, value: "Shipwright" },
    { min: 85, max: 87, value: "Tailor" },
    { min: 88, max: 90, value: "Tanner" },
    { min: 91, max: 93, value: "Thatcher / roofer" },
    { min: 94, max: 96, value: "Woodcutter" },
    { min: 97, max: 98, value: "Vintner" },
    { min: 99, max: 100, value: ROLL_TWO }
];

function rollD100() {
    return Math.floor(Math.random() * 100) + 1;
}

function findBackgroundEntry(roll) {
    return BACKGROUND_TABLE.find(entry => roll >= entry.min && roll <= entry.max) ?? null;
}

function rollSingleBackground() {
    const roll = rollD100();
    const entry = findBackgroundEntry(roll);

    if (entry === null) {
        throw new Error(`No background entry found for roll ${roll}.`);
    }

    if (entry.value === ROLL_TWO) {
        return null;
    }

    return entry.value;
}

function rollConcreteBackground() {
    let background = rollSingleBackground();

    while (background === null) {
        background = rollSingleBackground();
    }

    return background;
}

export function rollBackground() {
    const firstBackground = rollSingleBackground();

    if (firstBackground !== null) {
        return firstBackground;
    }

    // On 99-00, roll two backgrounds and avoid duplicates.
    const rolledBackgrounds = [];

    while (rolledBackgrounds.length < 2) {
        const nextBackground = rollConcreteBackground();

        if (!rolledBackgrounds.includes(nextBackground)) {
            rolledBackgrounds.push(nextBackground);
        }
    }

    return `${rolledBackgrounds[0]} + ${rolledBackgrounds[1]}`;
}

export function getBackgroundTable() {
    return [...BACKGROUND_TABLE];
}
