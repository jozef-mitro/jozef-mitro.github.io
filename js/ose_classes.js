class OseClass {
    constructor (name, primeRequisite, requirements, source, hitDie, saves) {
        this.name = name;
        this.primeRequisite = primeRequisite;
        this.requirements = typeof requirements === "string" ? requirements : "";
        this.source = source;
        this.hitDie = hitDie;
        this.saves = typeof saves === "string" ? saves : "";
    }

    static parseRequirements(requirements) {
        if (typeof requirements !== "string") {
            return [];
        }

        return requirements.split(",").map(requirement => requirement.trim()).filter(requirement => requirement.length > 0);
    }

    static parseSaves(saves) {
        if (typeof saves !== "string") {
            return [];
        }

        return saves
            .split(",")
            .map(save => save.trim())
            .filter(save => save.length > 0)
            .map(save => Number(save));
    }

    // CSV format: name;primeRequisite;requirementsCsv;source;hitDie;savesCsv
    static fromCsvLine(csvLine, delimiter = ";") {
        let parts = csvLine.split(delimiter).map(part => part.trim());

        if (parts.length !== 6) {
            throw new Error("Invalid OseClass CSV line. Expected 6 fields.");
        }

        return new OseClass(parts[0], parts[1], parts[2], parts[3], Number(parts[4]), parts[5]);
    }

    toCsvLine(delimiter = ";") {
        return [this.name, this.primeRequisite, this.requirements, this.source, this.hitDie, this.saves].join(delimiter);
    }
}

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