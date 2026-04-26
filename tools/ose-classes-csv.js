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
		header.length !== 9 ||
		header[0] !== "name" ||
		header[1] !== "primeRequisite" ||
		header[2] !== "requirements" ||
		header[3] !== "source" ||
		header[4] !== "hitDie" ||
		header[5] !== "saves" ||
		header[6] !== "xp" ||
		header[7] !== "languages" ||
		header[8] !== "forbiddenAlignments"
	) {
		throw new Error("Invalid CSV header. Expected: name;primeRequisite;requirements;source;hitDie;saves;xp;languages;forbiddenAlignments");
	}

	const rows = lines.slice(1).map((line, index) => {
		const rowNumber = index + 2;
		const parts = splitCsvLine(line);
		const expectedFieldCount = 9;

		if (parts.length !== expectedFieldCount) {
			throw new Error(`Invalid CSV row ${rowNumber}. Expected ${expectedFieldCount} fields but got ${parts.length}.`);
		}

		const [name, primeRequisite, requirements, source, hitDieRaw, saves, xp, languages, forbiddenAlignments] = parts;
		const hitDie = Number(hitDieRaw);

		if (Number.isNaN(hitDie)) {
			throw new Error(`Invalid hitDie at row ${rowNumber}: ${hitDieRaw}`);
		}

		validateSaves(saves, rowNumber);
		validateXpTable(xp, rowNumber);

		return `    new OseClass("${escapeJsString(name)}", "${escapeJsString(primeRequisite)}", "${escapeJsString(requirements)}", "${escapeJsString(source)}", ${hitDie}, "${escapeJsString(saves)}", "${escapeJsString(xp)}", "${escapeJsString(languages)}", "${escapeJsString(forbiddenAlignments)}")`;
	});

	const jsOutput = `import { OseClass } from "./OseClass.js";\n\nexport const OseClasses = [\n${rows.join(",\n")}\n];\n\nexport function getOseClasses(allowedSources) {\n    return OseClasses.filter(c => allowedSources.some(source => c.source.startsWith(source)));\n}\n`;

	fs.writeFileSync(outputJsPath, jsOutput, "utf8");
}

function parseJsOseClassArguments(content) {
	const constructorRegex = /new\s+OseClass\(\s*"((?:\\.|[^"])*)"\s*,\s*"((?:\\.|[^"])*)"\s*,\s*"((?:\\.|[^"])*)"\s*,\s*"((?:\\.|[^"])*)"\s*,\s*(\d+)\s*,\s*"((?:\\.|[^"])*)"\s*(?:,\s*"((?:\\.|[^"])*)"\s*)?(?:,\s*"((?:\\.|[^"])*)"\s*)?(?:,\s*"((?:\\.|[^"])*)"\s*)?\)/g;
	const classes = [];
	let match = constructorRegex.exec(content);

	while (match !== null) {
		classes.push({
			name: unescapeJsString(match[1]),
			primeRequisite: unescapeJsString(match[2]),
			requirements: unescapeJsString(match[3]),
			source: unescapeJsString(match[4]),
			hitDie: Number(match[5]),
			saves: unescapeJsString(match[6] || ""),
			xp: unescapeJsString(match[7] || ""),
			languages: unescapeJsString(match[8] || ""),
			forbiddenAlignments: unescapeJsString(match[9] || "")
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

	const header = "name;primeRequisite;requirements;source;hitDie;saves;xp;languages;forbiddenAlignments";
	const lines = classes.map(c => [
		c.name,
		c.primeRequisite,
		c.requirements,
		c.source,
		c.hitDie,
		c.saves,
		c.xp,
		c.languages,
		c.forbiddenAlignments
	].join(";"));

	fs.writeFileSync(outputCsvPath, `${header}\n${lines.join("\n")}\n`, "utf8");
}

function printUsage() {
	console.log("Usage:");
	console.log("  node tools/ose-classes-csv.js import <input.csv> <output.js>");
	console.log("  node tools/ose-classes-csv.js export <input.js> <output.csv>");
	console.log("  (CSV must contain: name;primeRequisite;requirements;source;hitDie;saves;xp;languages;forbiddenAlignments)");
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
