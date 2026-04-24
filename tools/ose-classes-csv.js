const fs = require("fs");

function splitCsvLine(line, delimiter = ";") {
	return line.split(delimiter).map(part => part.trim());
}

function escapeJsString(value) {
	return String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

function unescapeJsString(value) {
	return value.replace(/\\"/g, "\"").replace(/\\\\/g, "\\");
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

	if (header.length < 6 || header[0] !== "name" || header[5] !== "saves") {
		throw new Error("Invalid CSV header. Expected: name;primeRequisite;requirements;source;hitDie;saves");
	}

	const rows = lines.slice(1).map((line, index) => {
		const rowNumber = index + 2;
		const parts = splitCsvLine(line);

		if (parts.length !== 6) {
			throw new Error(`Invalid CSV row ${rowNumber}. Expected 6 fields but got ${parts.length}.`);
		}

		const [name, primeRequisite, requirements, source, hitDieRaw, saves] = parts;
		const hitDie = Number(hitDieRaw);

		if (Number.isNaN(hitDie)) {
			throw new Error(`Invalid hitDie at row ${rowNumber}: ${hitDieRaw}`);
		}

		validateSaves(saves, rowNumber);

		return `    new OseClass("${escapeJsString(name)}", "${escapeJsString(primeRequisite)}", "${escapeJsString(requirements)}", "${escapeJsString(source)}", ${hitDie}, "${escapeJsString(saves)}")`;
	});

	const jsOutput = `import { OseClass } from "./ose_classes.js";\n\nexport const OseClasses = [\n${rows.join(",\n")}\n];\n\nexport function getOseClasses(allowedSources) {\n    return OseClasses.filter(c => allowedSources.some(source => c.source.startsWith(source)));\n}\n`;

	fs.writeFileSync(outputJsPath, jsOutput, "utf8");
}

function parseJsOseClassArguments(content) {
	const constructorRegex = /new\s+OseClass\(\s*"((?:\\.|[^"])*)"\s*,\s*"((?:\\.|[^"])*)"\s*,\s*"((?:\\.|[^"])*)"\s*,\s*"((?:\\.|[^"])*)"\s*,\s*(\d+)\s*(?:,\s*"((?:\\.|[^"])*)"\s*)?\)/g;
	const classes = [];
	let match = constructorRegex.exec(content);

	while (match !== null) {
		classes.push({
			name: unescapeJsString(match[1]),
			primeRequisite: unescapeJsString(match[2]),
			requirements: unescapeJsString(match[3]),
			source: unescapeJsString(match[4]),
			hitDie: Number(match[5]),
			saves: unescapeJsString(match[6] || "")
		});

		match = constructorRegex.exec(content);
	}

	return classes;
}

function exportJsToCsv(inputJsPath, outputCsvPath) {
	const jsContent = fs.readFileSync(inputJsPath, "utf8");
	const classes = parseJsOseClassArguments(jsContent);

	if (classes.length === 0) {
		throw new Error("No OseClass entries found in JS file.");
	}

	const header = "name;primeRequisite;requirements;source;hitDie;saves";
	const lines = classes.map(c => [
		c.name,
		c.primeRequisite,
		c.requirements,
		c.source,
		c.hitDie,
		c.saves
	].join(";"));

	fs.writeFileSync(outputCsvPath, `${header}\n${lines.join("\n")}\n`, "utf8");
}

function printUsage() {
	console.log("Usage:");
	console.log("  node tools/ose-classes-csv.js import <input.csv> <output.js>");
	console.log("  node tools/ose-classes-csv.js export <input.js> <output.csv>");
	console.log("  (When importing to js/ose_classes_data.js, import path is set to ./ose_classes.js)");
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

	if (command === "export") {
		exportJsToCsv(inputPath, outputPath);

		return;
	}

	printUsage();
	process.exit(1);
}

main();
