export class OseClass {
    constructor (name, primeRequisite, requirements, source, hitDie, saves, expTable, languages, forbiddenAlignments) {
        this.name = name;
        this.primeRequisite = primeRequisite;
        this.requirements = typeof requirements === "string" ? requirements : "";
        this.source = source;
        this.hitDie = hitDie;
        this.saves = this.#parseSaves(saves);
        this.expTable = this.#parseExpTable(expTable);
        this.languages = this.#parseLanguages(languages);
        this.forbiddenAlignments = this.#parseForbiddenAlignments(forbiddenAlignments);
    }

    parseRequirements() {
        if (typeof this.requirements !== "string") {
            return [];
        }

        return this.requirements.split(",").map(requirement => requirement.trim()).filter(requirement => requirement.length > 0);
    }

    #parseSaves(rawSaves) {
        if (typeof rawSaves !== "string") {
            return {
                death: null,
                wand: null,
                paralysis: null,
                breath: null,
                spell: null
            };
        }

        let parsedSaves = rawSaves
            .split(",")
            .map(save => save.trim())
            .filter(save => save.length > 0)
            .map(save => Number(save));

        return {
            death: Number.isFinite(parsedSaves[0]) ? parsedSaves[0] : null,
            wand: Number.isFinite(parsedSaves[1]) ? parsedSaves[1] : null,
            paralysis: Number.isFinite(parsedSaves[2]) ? parsedSaves[2] : null,
            breath: Number.isFinite(parsedSaves[3]) ? parsedSaves[3] : null,
            spell: Number.isFinite(parsedSaves[4]) ? parsedSaves[4] : null
        };
    }

    #parseExpTable(rawExpTable) {
        if (typeof rawExpTable !== "string") {
            return [];
        }

        return rawExpTable
            .split(",")
            .map(xp => Number(xp.trim()) * 1000)
            .filter(xp => Number.isFinite(xp));
    }

    #parseLanguages(rawLanguages) {
        if (typeof rawLanguages !== "string" || rawLanguages.length === 0) {
            return [];
        }

        return rawLanguages
            .split(",")
            .map(lang => lang.trim())
            .filter(lang => lang.length > 0);
    }

    #parseForbiddenAlignments(rawForbiddenAlignments) {
        if (typeof rawForbiddenAlignments !== "string" || rawForbiddenAlignments.length === 0) {
            return [];
        }

        return rawForbiddenAlignments
            .split(",")
            .map(alignment => alignment.trim())
            .filter(alignment => alignment.length > 0);
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