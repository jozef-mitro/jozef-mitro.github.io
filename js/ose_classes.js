class OseClass {
    constructor (name, primeRequisite, requirements, source, hitDie) {
        this.name = name;
        this.primeRequisite = primeRequisite;
        this.requirements = typeof requirements === "string" ? requirements : "";
        this.source = source;
        this.hitDie = hitDie;
    }

    static parseRequirements(requirements) {
        if (typeof requirements !== "string") {
            return [];
        }

        return requirements.split(",").map(requirement => requirement.trim()).filter(requirement => requirement.length > 0);
    }

    // CSV format: name;primeRequisite;requirementsCsv;source;hitDie
    static fromCsvLine(csvLine, delimiter = ";") {
        let parts = csvLine.split(delimiter).map(part => part.trim());

        if (parts.length !== 5) {
            throw new Error("Invalid OseClass CSV line. Expected 5 fields.");
        }

        return new OseClass(parts[0], parts[1], parts[2], parts[3], Number(parts[4]));
    }

    toCsvLine(delimiter = ";") {
        return [this.name, this.primeRequisite, this.requirements, this.source, this.hitDie].join(delimiter);
    }
}

let OseClasses = [
    // Classic Fantasy
    new OseClass("Cleric", "10@wis16,5@wis13,0@wis9,-10@wis6,-20", "", "Classic Fantasy", 6),
    new OseClass("Dwarf", "10@str16,5@str13,0@str9,-10@str6,-20", "con", "Classic Fantasy", 8),
    new OseClass("Elf", "10@int16+str13,5@int13+str13,0", "int", "Classic Fantasy", 6),
    new OseClass("Fighter", "10@str16,5@str13,0@str9,-10@str6,-20", "", "Classic Fantasy", 8),
    new OseClass("Halfling", "10@dex13+str13,5@dex13|str13,0", "con,dex", "Classic Fantasy", 6),
    new OseClass("Magic-User", "10@int16,5@int13,0@int9,-10@int6,-20", "", "Classic Fantasy", 4),
    new OseClass("Thief", "10@dex16,5@dex13,0@dex9,-10@dex6,-20", "", "Classic Fantasy", 4),
    // Advanced Fantasy
    new OseClass("Acrobat", "10@dex16,5@dex13,0@dex9,-10@dex6,-20", "", "Advanced Fantasy", 4),
    new OseClass("Assassin", "10@dex16,5@dex13,0@dex9,-10@dex6,-20", "", "Advanced Fantasy", 4),
    new OseClass("Barbarian", "10@con16+str16,5@con13|str13,0", "dex", "Advanced Fantasy", 8),
    new OseClass("Bard", "10@cha16,5@cha13,0@cha9,-10@cha6,-20", "dex,int", "Advanced Fantasy", 6),
    new OseClass("Drow", "10@wis16+str13,5@wis13+str13,0", "int", "Advanced Fantasy", 6),
    new OseClass("Druid", "10@wis16,5@wis13,0@wis9,-10@wis6,-20", "", "Advanced Fantasy", 6),
    new OseClass("Duergar", "10@str16,5@str13,0@str9,-10@str6,-20", "con,int", "Advanced Fantasy", 6),
    new OseClass("Gnome", "10@int16+dex13,5@int13+dex13,0", "con", "Advanced Fantasy", 4),
    new OseClass("Half-Elf", "10@int16+str13|int13+str16,5@int13+str13,0", "cha,con", "Advanced Fantasy", 6),
    new OseClass("Half-Orc", "10@str16+dex16,5@str13+dex13,0", "", "Advanced Fantasy", 6),
    new OseClass("Illusionist", "10@int16,5@int13,0@int9,-10@int6,-20", "dex", "Advanced Fantasy", 4),
    new OseClass("Knight", "10@str16,5@str13,0@str9,-10@str6,-20", "con,dex", "Advanced Fantasy", 8),
    new OseClass("Paladin", "10@str16+wis16,5@str13|wis13,0", "cha", "Advanced Fantasy", 8),
    new OseClass("Ranger", "10@str16,5@str13,0@str9,-10@str6,-20", "con,wis", "Advanced Fantasy", 8),
    new OseClass("Svirfneblin", "10@str16,5@str13,0@str9,-10@str6,-20", "con", "Advanced Fantasy", 6),
    // Carcass Crawler
    new OseClass("Arcane Bard", "10@cha16+dex13|cha13+dex16,5@cha13+dex13,0", "int", "Carcass Crawler 0", 6),
    new OseClass("Beast Master", "10@str16+wis16,5@str13|wis13,0", "", "Carcass Crawler 0 and 3", 6),
    new OseClass("Changeling", "10@cha16+dex16,5@cha13|dex13,0", "int", "Carcass Crawler 0", 6),
    new OseClass("Chaos Knight", "10@str16+wis16,5@str13|wis13,0", "cha", "Carcass Crawler 0", 8),
    new OseClass("Mage", "10@int16+wis13,5@int13+wis13,0", "", "Carcass Crawler 0 and 1", 6),
    new OseClass("Mutoid", "10@dex16,5@dex13,0@dex9,-10@dex6,-20", "", "Carcass Crawler 0 and 3", 6),
    new OseClass("Mycelian", "10@str16,5@str13,0@str9,-10@str6,-20", "con", "Carcass Crawler 0 and 3", 8),
    new OseClass("Warden", "10@str16,5@str13,0@str9,-10@str6,-20", "con,wis", "Carcass Crawler 0", 8),
    new OseClass("Acolyte", "10@wis16,5@wis13,0@wis9,-10@wis6,-20", "", "Carcass Crawler 1", 6),
    new OseClass("Gargantua", "10@str16+con13,5@str13+con13,0", "con,str", "Carcass Crawler 1", 10),
    new OseClass("Goblin", "10@dex16+str16,5@dex13|str13,0", "dex", "Carcass Crawler 1", 6),
    new OseClass("Hephaestan", "10@int16+wis13,5@int13|wis13,0", "cha,con", "Carcass Crawler 1", 6),
    new OseClass("Kineticist", "10@dex16+wis16,5@dex13+wis13,0", "", "Carcass Crawler 1", 6),
    new OseClass("Phase Elf", "10@int16+str13,5@int13+str13,0", "int", "Carcass Crawler 2", 6),
    new OseClass("Wood Elf", "10@dex16+wis13,5@dex13+wis13,0", "dex,int", "Carcass Crawler 2", 6),
    new OseClass("Dragonborn", "10@str16,5@str13,0@str9,-10@str6,-20", "con,int", "Carcass Crawler 3", 8),
    new OseClass("Tiefling", "10@cha16+dex16,5@cha13|dex13,0", "int", "Carcass Crawler 3", 6),
    // Other
    new OseClass("Necromancer", "10@int16,5@int13,0@int9,-10@int6,-20", "wis", "The Necromancer", 4)
]

function getOseClasses(allowedSources) {
    return OseClasses.filter(c => allowedSources.some(source => c.source.startsWith(source)));
}

// Prime Requisite DSL Syntax:
// Format: bonus@condition,bonus@condition,...,defaultBonus
// - Bonuses are numbers (10, 5, 0, -10, -20, etc.)
// - Conditions match scores using ability+threshold format (e.g., wis13, str16)
// - Multiple conditions are combined with operators:
//   + (AND): all must pass (e.g., int16+dex13 requires int>=16 AND dex>=13)
//   | (OR):  at least one must pass (e.g., str13|dex13 requires str>=13 OR dex>=13)
// - Rules are evaluated in order; first match wins
// - The final segment without @ is the default fallback bonus
// Examples:
//   "10@wis16,5@wis13,0@wis9,-10@wis6,-20" - standard single-stat progression
//   "10@int16+dex13,5@int13+dex13,0" - dual-stat with AND condition
//   "10@str16|dex16,5@str13|dex13,0" - dual-stat with OR condition

function meetsPrimeRequisiteClause(scores, clause) {
    let checks = clause.split("+").map(check => check.trim()).filter(check => check.length > 0);

    return checks.every(check => {
        let match = check.match(/^([a-z]+)(\d+)$/);

        if (match === null) {
            return false;
        }

        let ability = match[1];
        let minimum = Number(match[2]);

        return scores[ability] >= minimum;
    });
}

function meetsPrimeRequisiteCondition(scores, condition) {
    let clauses = condition.split("|").map(clause => clause.trim()).filter(clause => clause.length > 0);

    if (clauses.length === 0) {
        return false;
    }

    return clauses.some(clause => meetsPrimeRequisiteClause(scores, clause));
}

function getRuleBasedExpBonus(primeRequisiteSpec, scores) {
    let rules = primeRequisiteSpec.split(",").map(rule => rule.trim()).filter(rule => rule.length > 0);

    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let atIndex = rule.indexOf("@");

        if (atIndex === -1) {
            return Number(rule);
        }

        let bonus = Number(rule.slice(0, atIndex));
        let condition = rule.slice(atIndex + 1);

        if (meetsPrimeRequisiteCondition(scores, condition)) {
            return bonus;
        }
    }

    return 0;
}

function getExpBonus(classData, scores) {
    return getRuleBasedExpBonus(classData.primeRequisite, scores);
}