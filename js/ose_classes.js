export class OseClass {
    constructor (name, primeRequisite, requirements, source, hitDie, saves) {
        this.name = name;
        this.primeRequisite = primeRequisite;
        this.requirements = typeof requirements === "string" ? requirements : "";
        this.source = source;
        this.hitDie = hitDie;
        this.saves = typeof saves === "string" ? saves : "";
    }

    parseRequirements() {
        if (typeof this.requirements !== "string") {
            return [];
        }

        return this.requirements.split(",").map(requirement => requirement.trim()).filter(requirement => requirement.length > 0);
    }

    parseSaves() {
        if (typeof this.saves !== "string") {
            return [];
        }

        return this.saves
            .split(",")
            .map(save => save.trim())
            .filter(save => save.length > 0)
            .map(save => Number(save));
    }

    getExpBonus(scores) {
        let rules = this.primeRequisite.split(",").map(rule => rule.trim()).filter(rule => rule.length > 0);

        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let atIndex = rule.indexOf("@");

            if (atIndex === -1) {
                return Number(rule);
            }

            let bonus = Number(rule.slice(0, atIndex));
            let condition = rule.slice(atIndex + 1);

            if (this.#meetsPrimeRequisiteCondition(scores, condition)) {
                return bonus;
            }
        }

        return 0;
    }

    #meetsPrimeRequisiteClause(scores, clause) {
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

    #meetsPrimeRequisiteCondition(scores, condition) {
        let clauses = condition.split("|").map(clause => clause.trim()).filter(clause => clause.length > 0);

        if (clauses.length === 0) {
            return false;
        }

        return clauses.some(clause => this.#meetsPrimeRequisiteClause(scores, clause));
    }
}