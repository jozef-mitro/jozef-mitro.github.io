#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CONSTRUCTOR_PATTERN = /new\s+OseClass\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*(-?\d+)\s*\)/g;

function usage() {
    console.log("Usage:");
    console.log("  node tools/ose-classes-csv.js export <inputJsFile> <outputCsvFile>");
    console.log("  node tools/ose-classes-csv.js import <inputCsvFile> <outputJsFile>");
    console.log("");
    console.log("CSV format: name;primeRequisite;requirements;source;hitDie");
}

function parseClassesFromJs(jsText) {
    let classes = [];
    let match;

    while ((match = CONSTRUCTOR_PATTERN.exec(jsText)) !== null) {
        classes.push({
            name: match[1],
            primeRequisite: match[2],
            requirements: match[3],
            source: match[4],
            hitDie: Number(match[5])
        });
    }

    return classes;
}

function toCsvLine(classData) {
    return [
        classData.name,
        classData.primeRequisite,
        classData.requirements,
        classData.source,
        String(classData.hitDie)
    ].join(";");
}

function parseCsvLine(line, lineNumber) {
    let parts = line.split(";").map(part => part.trim());

    if (parts.length !== 5) {
        throw new Error(`Invalid CSV at line ${lineNumber}: expected 5 fields, got ${parts.length}`);
    }

    let hitDie = Number(parts[4]);

    if (!Number.isFinite(hitDie)) {
        throw new Error(`Invalid CSV at line ${lineNumber}: hitDie must be a number`);
    }

    return {
        name: parts[0],
        primeRequisite: parts[1],
        requirements: parts[2],
        source: parts[3],
        hitDie
    };
}

function escapeForJs(value) {
    return value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

function toJsLine(classData) {
    return `new OseClass("${escapeForJs(classData.name)}", "${escapeForJs(classData.primeRequisite)}", "${escapeForJs(classData.requirements)}", "${escapeForJs(classData.source)}", ${classData.hitDie})`;
}

function exportCsv(inputJsFile, outputCsvFile) {
    let jsText = fs.readFileSync(inputJsFile, "utf8");
    let classes = parseClassesFromJs(jsText);

    if (classes.length === 0) {
        throw new Error("No OseClass constructor calls found in input JS file.");
    }

    let header = "name;primeRequisite;requirements;source;hitDie";
    let csv = [header, ...classes.map(toCsvLine)].join("\n") + "\n";

    fs.writeFileSync(outputCsvFile, csv, "utf8");
    console.log(`Exported ${classes.length} classes to ${outputCsvFile}`);
}

function importCsv(inputCsvFile, outputJsFile) {
    let csvText = fs.readFileSync(inputCsvFile, "utf8");
    let lines = csvText.split(/\r?\n/).map(line => line.trim());
    let nonEmptyLines = lines.filter(line => line.length > 0);

    if (nonEmptyLines.length === 0) {
        throw new Error("CSV file is empty.");
    }

    let dataLines = nonEmptyLines;

    if (nonEmptyLines[0].toLowerCase() === "name;primerequisite;requirements;source;hitdie") {
        dataLines = nonEmptyLines.slice(1);
    }

    let classes = dataLines.map((line, index) => parseCsvLine(line, index + 1));

    let body = [
        "let OseClasses = [",
        ...classes.map(classData => `    ${toJsLine(classData)},`),
        "];",
        ""
    ].join("\n");

    fs.writeFileSync(outputJsFile, body, "utf8");
    console.log(`Imported ${classes.length} classes to ${outputJsFile}`);
}

function main() {
    let [, , command, inputFile, outputFile] = process.argv;

    if (!command || !inputFile || !outputFile) {
        usage();
        process.exit(1);
    }

    let resolvedInput = path.resolve(process.cwd(), inputFile);
    let resolvedOutput = path.resolve(process.cwd(), outputFile);

    if (command === "export") {
        exportCsv(resolvedInput, resolvedOutput);
        return;
    }

    if (command === "import") {
        importCsv(resolvedInput, resolvedOutput);
        return;
    }

    usage();
    process.exit(1);
}

try {
    main();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
