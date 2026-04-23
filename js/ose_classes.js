class OseClass {
    constructor (name, primeRequisite, requirements, source, hitDie) {
        this.name = name;
        this.primeRequisite = primeRequisite;
        this.requirements = requirements;
        this.source = source;
        this.hitDie = hitDie;
    }
}

let OseClasses = [
    // Classic Fantasy
    new OseClass("Cleric", "wis", [], "Classic Fantasy", 6),
    new OseClass("Dwarf", "str", ["con"], "Classic Fantasy", 8),
    new OseClass("Elf", function (scores) {
        if (scores.int >= 16 && scores.str >= 13) {
            return 10;
        } else if (scores.int >= 13 && scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["int"], "Classic Fantasy", 6),
    new OseClass("Fighter", "str", [], "Classic Fantasy", 8),
    new OseClass("Halfling", function(scores) {
        if (scores.dex >= 13 && scores.str >= 13) {
            return 10;
        } else if (scores.dex >= 13 || scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["con", "dex"], "Classic Fantasy", 6),
    new OseClass("Magic-User", "int", [], "Classic Fantasy", 4),
    new OseClass("Thief", "dex", [], "Classic Fantasy", 4),
    // Advanced Fantasy
    new OseClass("Acrobat", "dex", [], "Advanced Fantasy", 4),
    new OseClass("Assassin", "dex", [], "Advanced Fantasy", 4),
    new OseClass("Barbarian", function(scores) {
        if (scores.con >= 16 && scores.str >= 16) {
            return 10;
        } else if (scores.con >= 13 || scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["dex"], "Advanced Fantasy", 8),
    new OseClass("Bard", "cha", ["dex", "int"], "Advanced Fantasy", 6),
    new OseClass("Drow", function(scores) {
        if (scores.wis >= 16 && scores.str >= 13) {
            return 10;
        } else if (scores.wis >= 13 && scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["int"], "Advanced Fantasy", 6),
    new OseClass("Druid", "wis", [], "Advanced Fantasy", 6),
    new OseClass("Duergar", "str", ["con", "int"], "Advanced Fantasy", 6),
    new OseClass("Gnome", function(scores) {
        if (scores.int >= 16 && scores.dex >= 13) {
            return 10;
        } else if (scores.int >= 13 && scores.dex >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["con"], "Advanced Fantasy", 4),
    new OseClass("Half-Elf", function(scores) {
        if ((scores.int >= 16 && scores.str >= 13) || (scores.str >= 16 && scores.int >= 13)) {
            return 10;
        } else if (scores.int >= 13 && scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["cha", "con"], "Advanced Fantasy", 6),
    new OseClass("Half-Orc", function(scores) {
        if (scores.str >= 16 && scores.dex >= 16) {
            return 10;
        } else if (scores.str >= 13 && scores.dex >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, [], "Advanced Fantasy", 6),
    new OseClass("Illusionist", "int", ["dex"], "Advanced Fantasy", 4),
    new OseClass("Knight", "str", ["con", "dex"], "Advanced Fantasy", 8),
    new OseClass("Paladin", function(scores) {
        if (scores.str >= 16 && scores.wis >= 16) {
            return 10;
        } else if (scores.str >= 13 || scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["cha"], "Advanced Fantasy", 8),
    new OseClass("Ranger", "str", ["con", "wis"], "Advanced Fantasy", 8),
    new OseClass("Svirfneblin", "str", ["con"], "Advanced Fantasy", 6),
    // Carcass Crawler
    new OseClass("Arcane Bard", function(scores) {
        if ((scores.cha >= 16 && scores.dex >= 13) || (scores.dex >= 16 && scores.cha >= 13)) {
            return 10;
        } else if (scores.cha >= 13 && scores.dex >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["int"], "Carcass Crawler 0", 6),
    new OseClass("Beast Master", function(scores) {
        if (scores.str >= 16 && scores.wis >= 16) {
            return 10;
        } else if (scores.str >= 13 || scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, [], "Carcass Crawler 0 and 3", 6),
    new OseClass("Changeling", function(scores) {
        if (scores.cha >= 16 && scores.dex >= 16) {
            return 10;
        } else if (scores.cha >= 13 || scores.dex >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["int"], "Carcass Crawler 0", 6),
    new OseClass("Chaos Knight", function(scores) {
        if (scores.str >= 16 && scores.wis >= 16) {
            return 10;
        } else if (scores.str >= 13 || scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["cha"], "Carcass Crawler 0", 8),
    new OseClass("Mage", function(scores) {
        if (scores.int >= 16 && scores.wis >= 13) {
            return 10;
        } else if (scores.int >= 13 && scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, [], "Carcass Crawler 0 and 1", 6),
    new OseClass("Mutoid", "dex", [], "Carcass Crawler 0 and 3", 6),
    new OseClass("Mycelian", "str", ["con"], "Carcass Crawler 0 and 3", 8),
    new OseClass("Warden", "str", ["con", "wis"], "Carcass Crawler 0", 8),
    new OseClass("Acolyte", "wis", [], "Carcass Crawler 1", 6),
    new OseClass("Gargantua", function(scores) {
        if (scores.str >= 16 && scores.con >= 13) {
            return 10;
        } else if (scores.con >= 13 && scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["con", "str"], "Carcass Crawler 1", 10),
    new OseClass("Goblin", function(scores) {
        if (scores.dex >= 16 && scores.str >= 16) {
            return 10;
        } else if (scores.dex >= 13 || scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["dex"], "Carcass Crawler 1", 6),
    new OseClass("Hephaestan", function(scores) {
        if (scores.int >= 16 && scores.wis >= 13) {
            return 10;
        } else if (scores.int >= 13 || scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["cha", "con"], "Carcass Crawler 1", 6),
    new OseClass("Kineticist", function(scores) {
        if (scores.dex >= 16 && scores.wis >= 16) {
            return 10;
        } else if (scores.dex >= 13 && scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, [], "Carcass Crawler 1", 6),
    new OseClass("Phase Elf", function(scores) {
        if (scores.int >= 16 && scores.str >= 13) {
            return 10;
        } else if (scores.int >= 13 && scores.str >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["int"], "Carcass Crawler 2", 6),
    new OseClass("Wood Elf", function(scores) {
        if (scores.dex >= 16 && scores.wis >= 13) {
            return 10;
        } else if (scores.dex >= 13 && scores.wis >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["dex", "int"], "Carcass Crawler 2", 6),
    new OseClass("Dragonborn", "str", ["con", "int"], "Carcass Crawler 3", 8),
    new OseClass("Tiefling", function(scores) {
        if (scores.cha >= 16 && scores.dex >= 16) {
            return 10;
        } else if (scores.cha >= 13 || scores.dex >= 13) {
            return 5;
        } else {
            return 0;
        }
    }, ["int"], "Carcass Crawler 3", 6),
    // Other
    new OseClass("Necromancer", "int", ["wis"], "The Necromancer", 4)
]

function getOseClasses(allowedSources) {
    return OseClasses.filter(c => allowedSources.some(source => c.source.startsWith(source)));
}

function getExpBonus(classData, scores) {
    if (typeof classData.primeRequisite === "string") {
        let primeRequisite = classData.primeRequisite;

        if (scores[primeRequisite] >= 16) {
            return 10;
        } else if (scores[primeRequisite] >= 13) {
            return 5;
        } else if (scores[primeRequisite] >= 9) {
            return 0;
        } else if (scores[primeRequisite] >= 6) {
            return -10;
        } else {
            return -20;
        }
    } else if (typeof classData.primeRequisite === "function") {
        return classData.primeRequisite(scores);
    }
}