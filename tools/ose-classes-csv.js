const fs = require("fs");

function splitCsvLine(line, delimiter = ";") {
	return line.split(delimiter).map(part => part.trim());
}

function escapeJsString(value) {
	return String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

function validateSaves(saves, rowNumber) {
	if (typeof saves !== "string" || saves.length === 0) {
		throw new Error(`Invalid saves at row ${rowNumber}: saves field is empty or missing.`);
	}

	const saveValues = saves.split(",").map(v => v.trim());

	if (saveValues.length !== 5) {
		throw new Error(`Invalid saves at row ${rowNumber}: expected 5 save values, got ${saveValues.length}. Saves: ${saves}`);
	}

	for (let i = 0; i < saveValues.length; i++) {
		const num = Number(saveValues[i]);

		if (Number.isNaN(num) || !Number.isInteger(num)) {
			throw new Error(`Invalid saves at row ${rowNumber}: save value at index ${i} is not an integer: "${saveValues[i]}". Saves: ${saves}`);
		}
	}
}

function validateXpTable(xpTable, rowNumber) {
	if (typeof xpTable !== "string" || xpTable.length === 0) {
		throw new Error(`Invalid xp at row ${rowNumber}: xp field is empty or missing.`);
	}

	const xpValues = xpTable.split(",").map(v => v.trim()).filter(v => v.length > 0);

	if (xpValues.length === 0) {
		throw new Error(`Invalid xp at row ${rowNumber}: expected at least one xp value. XP: ${xpTable}`);
	}

	for (let i = 0; i < xpValues.length; i++) {
		const num = Number(xpValues[i]);

		if (!Number.isFinite(num)) {
			throw new Error(`Invalid xp at row ${rowNumber}: xp value at index ${i} is not a number: "${xpValues[i]}". XP: ${xpTable}`);
		}
	}
}

function validateForbiddenAlignments(forbiddenAlignments, rowNumber) {
	if (typeof forbiddenAlignments !== "string") {
		throw new Error(`Invalid forbiddenAlignments at row ${rowNumber}: value must be a string.`);
	}

	const alignments = forbiddenAlignments
		.split(",")
		.map(value => value.trim())
		.filter(value => value.length > 0);

	if (alignments.length > 2) {
		throw new Error(
			`Invalid forbiddenAlignments at row ${rowNumber}: expected at most 2 values, got ${alignments.length}. forbiddenAlignments: ${forbiddenAlignments}`
		);
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

	if (
		header.length !== 11 ||
		header[0] !== "name" ||
		header[1] !== "primeRequisite" ||
		header[2] !== "requirements" ||
		header[3] !== "source" ||
		header[4] !== "hitDie" ||
		header[5] !== "saves" ||
		header[6] !== "xp" ||
		header[7] !== "languages" ||
		header[8] !== "forbiddenAlignments" ||
		header[9] !== "armour" ||
		header[10] !== "weapons"
	) {
		throw new Error("Invalid CSV header. Expected: name;primeRequisite;requirements;source;hitDie;saves;xp;languages;forbiddenAlignments;armour;weapons");
	}

	const rows = lines.slice(1).map((line, index) => {
		const rowNumber = index + 2;
		const parts = splitCsvLine(line);
		const expectedFieldCount = 11;

		if (parts.length !== expectedFieldCount) {
			throw new Error(`Invalid CSV row ${rowNumber}. Expected ${expectedFieldCount} fields but got ${parts.length}.`);
		}

		const [name, primeRequisite, requirements, source, hitDieRaw, saves, xp, languages, forbiddenAlignments, armour, weapons] = parts;
		const hitDie = Number(hitDieRaw);

		if (Number.isNaN(hitDie)) {
			throw new Error(`Invalid hitDie at row ${rowNumber}: ${hitDieRaw}`);
		}

		validateSaves(saves, rowNumber);
		validateXpTable(xp, rowNumber);
		validateForbiddenAlignments(forbiddenAlignments, rowNumber);

		return `    new OseClass("${escapeJsString(name)}", "${escapeJsString(primeRequisite)}", "${escapeJsString(requirements)}", "${escapeJsString(source)}", ${hitDie}, "${escapeJsString(saves)}", "${escapeJsString(xp)}", "${escapeJsString(languages)}", "${escapeJsString(forbiddenAlignments)}", "${escapeJsString(armour)}", "${escapeJsString(weapons)}")`;
	});

	const jsOutput = `import { OseClass } from "./OseClass.js";\n\nexport const OseClasses = [\n${rows.join(",\n")}\n];\n\nexport function getOseClasses(allowedSources) {\n    return OseClasses.filter(c => allowedSources.some(source => c.source.startsWith(source)));\n}\n`;

	fs.writeFileSync(outputJsPath, jsOutput, "utf8");
}

function printUsage() {
	console.log("Usage:");
	console.log("  node tools/ose-classes-csv.js import <input.csv> <output.js>");
	console.log("  (CSV must contain: name;primeRequisite;requirements;source;hitDie;saves;xp;languages;forbiddenAlignments;armour;weapons)");
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
