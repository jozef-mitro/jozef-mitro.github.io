let OseClasses = [
    // Classic Fantasy
    {
        name: "Cleric",
        requirements: [],
        primeRequisite: "wis",
        source: "Classic Fantasy"
    },
    {
        name: "Dwarf",
        requirements: ["con"],
        primeRequisite: "str",
        source: "Classic Fantasy"
    },
    {
        name: "Elf",
        requirements: ["int"],
        primeRequisite: function (scores) {
            if (scores.int >= 16 && scores.str >= 13) {
                return 10;
            } else if (scores.int >= 13 && scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Classic Fantasy"
    },
    {
        name: "Fighter",
        requirements: [],
        primeRequisite: "str",
        source: "Classic Fantasy"
    },
    {
        name: "Halfling",
        requirements: ["con", "dex"],
        primeRequisite: function(scores) {
            if (scores.dex >= 13 && scores.str >= 13) {
                return 10;
            } else if (scores.dex >= 13 || scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Classic Fantasy"
    },
    {
        name: "Magic-User",
        requirements: [],
        primeRequisite: "int",
        source: "Classic Fantasy"
    },
    {
        name: "Thief",
        requirements: [],
        primeRequisite: "dex",
        source: "Classic Fantasy"
    },
    // Advanced Fantasy
    {
        name: "Acrobat",
        requirements: [],
        primeRequisite: "dex",
        source: "Advanced Fantasy"
    },
    {
        name: "Assassin",
        requirements: [],
        primeRequisite: "dex",
        source: "Advanced Fantasy"
    },
    {
        name: "Barbarian",
        requirements: ["dex"],
        primeRequisite: function(scores) {
            if (scores.con >= 16 && scores.str >= 16) {
                return 10;
            } else if (scores.con >= 13 || scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Advanced Fantasy"
    },
    {
        name: "Bard",
        requirements: ["dex", "int"],
        primeRequisite: "cha",
        source: "Advanced Fantasy"
    },
    {
        name: "Drow",
        requirements: ["int"],
        primeRequisite: function(scores) {
            if (scores.wis >= 16 && scores.str >= 13) {
                return 10;
            } else if (scores.wis >= 13 && scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Advanced Fantasy"
    },
    {
        name: "Druid",
        requirements: [],
        primeRequisite: "wis",
        source: "Advanced Fantasy"
    },
    {
        name: "Duergar",
        requirements: ["con", "int"],
        primeRequisite: "str",
        source: "Advanced Fantasy"
    },
    {
        name: "Gnome",
        requirements: ["con"],
        primeRequisite: function(scores) {
            if (scores.int >= 16 && scores.dex >= 13) {
                return 10;
            } else if (scores.int >= 13 && scores.dex >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Advanced Fantasy"
    },
    {
        name: "Half-Elf",
        requirements: ["cha", "con"],
        primeRequisite: function(scores) {
            if ((scores.int >= 16 && scores.str >= 13) || (scores.str >= 16 && scores.int >= 13)) {
                return 10;
            } else if (scores.int >= 13 && scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Advanced Fantasy"
    },
    {
        name: "Half-Orc",
        requirements: [],
        primeRequisite: function(scores) {
            if (scores.str >= 16 && scores.dex >= 16) {
                return 10;
            } else if (scores.str >= 13 && scores.dex >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Advanced Fantasy"
    },
    {
        name: "Illusionist",
        requirements: ["dex"],
        primeRequisite: "int",
        source: "Advanced Fantasy"
    },
    {
        name: "Knight",
        requirements: ["con", "dex"],
        primeRequisite: "str",
        source: "Advanced Fantasy"
    },
    {
        name: "Paladin",
        requirements: ["cha"],
        primeRequisite: function(scores) {
            if (scores.str >= 16 && scores.wis >= 16) {
                return 10;
            } else if (scores.str >= 13 || scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Advanced Fantasy"
    },
    {
        name: "Ranger",
        requirements: ["con", "wis"],
        primeRequisite: "str",
        source: "Advanced Fantasy"
    },
    {
        name: "Svirfneblin",
        requirements: ["con"],
        primeRequisite: "str",
        source: "Advanced Fantasy"
    },
    // Carcass Crawler
    {
        name: "Arcane Bard",
        requirements: ["int"],
        primeRequisite: function(scores) {
            if ((scores.cha >= 16 && scores.dex >= 13) || (scores.dex >= 16 && scores.cha >= 13)) {
                return 10;
            } else if (scores.cha >= 13 && scores.dex >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 0"
    },
    {
        name: "Beast Master",
        requirements: [],
        primeRequisite: function(scores) {
            if (scores.str >= 16 && scores.wis >= 16) {
                return 10;
            } else if (scores.str >= 13 || scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 0 and 3"
    },
    {
        name: "Changeling",
        requirements: ["int"],
        primeRequisite: function(scores) {
            if (scores.cha >= 16 && scores.dex >= 16) {
                return 10;
            } else if (scores.cha >= 13 || scores.dex >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 0"
    },
    {
        name: "Chaos Knight",
        requirements: ["cha"],
        primeRequisite: function(scores) {
            if (scores.str >= 16 && scores.wis >= 16) {
                return 10;
            } else if (scores.str >= 13 || scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 0"
    },
    {
        name: "Mage",
        requirements: [],
        primeRequisite: function(scores) {
            if (scores.int >= 16 && scores.wis >= 13) {
                return 10;
            } else if (scores.int >= 13 && scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 0 and 1"
    },
    {
        name: "Mutoid",
        requirements: [],
        primeRequisite: "dex",
        source: "Carcass Crawler 0 and 3"
    },
    {
        name: "Mycelian",
        requirements: ["con"],
        primeRequisite: "str",
        source: "Carcass Crawler 0 and 3"
    },
    {
        name: "Warden",
        requirements: ["con", "wis"],
        primeRequisite: "str",
        source: "Carcass Crawler 0"
    },
    {
        name: "Acolyte",
        requirements: [],
        primeRequisite: "wis",
        source: "Carcass Crawler 1"
    },
    {
        name: "Gargantua",
        requirements: ["con", "str"],
        primeRequisite: function(scores) {
            if (scores.str >= 16 && scores.con >= 13) {
                return 10;
            } else if (scores.con >= 13 && scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 1"
    },
    {
        name: "Goblin",
        requirements: ["dex"],
        primeRequisite: function(scores) {
            if (scores.dex >= 16 && scores.str >= 16) {
                return 10;
            } else if (scores.dex >= 13 || scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 1"
    },
    {
        name: "Hephaestan",
        requirements: ["cha", "con"],
        primeRequisite: function(scores) {
            if (scores.int >= 16 && scores.wis >= 13) {
                return 10;
            } else if (scores.int >= 13 || scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 1"
    },
    {
        name: "Kineticist",
        requirements: [],
        primeFive: "dex 13 and wis 13",
        primeTen: "dex 16 and wis 16",
        primeRequisite: function(scores) {
            if (scores.dex >= 16 && scores.wis >= 16) {
                return 10;
            } else if (scores.dex >= 13 && scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 1"
    },
    {
        name: "Phase Elf",
        requirements: ["int"],
        primeRequisite: function(scores) {
            if (scores.int >= 16 && scores.str >= 13) {
                return 10;
            } else if (scores.int >= 13 && scores.str >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 2"
    },
    {
        name: "Wood Elf",
        requirements: ["dex", "int"],
        primeRequisite: function(scores) {
            if (scores.dex >= 16 && scores.wis >= 13) {
                return 10;
            } else if (scores.dex >= 13 && scores.wis >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 2"
    },
    {
        name: "Dragonborn",
        requirements: ["con", "int"],
        primeRequisite: "str",
        source: "Carcass Crawler 2"
    },
    {
        name: "Tiefling",
        requirements: ["int"],
        primeRequisite: function(scores) {
            if (scores.cha >= 16 && scores.dex >= 16) {
                return 10;
            } else if (scores.cha >= 13 || scores.dex >= 13) {
                return 5;
            } else {
                return 0;
            }
        },
        source: "Carcass Crawler 2"
    },
    // Other
    {
        name: "Necromancer",
        requirements: ["wis"],
        primeRequisite: "int",
        source: "The Necromancer"
    }
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