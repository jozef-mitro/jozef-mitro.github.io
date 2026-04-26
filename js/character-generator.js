import { getSingleName } from "./names.js";
import { OseClasses } from "./ose-classes.js";
import { rollBackground } from "./backgrounds.js";
import { writeClipboardText } from "./utils.js";
import { generateCharacterBatch } from "./generator/character-factory.js";
import { initSourceClassSync, getAllowedClassNames, getSourceGroup } from "./ui/source-class-sync.js";
import { renderCharactersTable } from "./ui/character-table.js";
import { copyCharacters, setCopyState } from "./ui/copy-actions.js";

/** @type {import("./generator/types.js").Character[]} */
let lastGeneratedCharacters = [];

document.addEventListener("DOMContentLoaded", () => {
    const characterForm = document.getElementById("characterGeneratorForm");
    const copyCharactersButton = document.getElementById("copyCharacters");
    const allowedClassesElement = document.getElementById("allowedClasses");

    populateAllowedClasses();

    if (allowedClassesElement !== null) {
        initSourceClassSync({ allowedClassesElement });
    }

    if (characterForm !== null) {
        characterForm.addEventListener("submit", generateCharacters);
    }

    if (copyCharactersButton !== null) {
        copyCharactersButton.addEventListener("click", copyCharactersHandler);
    }
});

function populateAllowedClasses() {
    const allowedClassesElement = document.getElementById("allowedClasses");

    if (allowedClassesElement === null) {
        return;
    }

    const sortedClasses = [...OseClasses].sort((a, b) => a.name.localeCompare(b.name));

    allowedClassesElement.innerHTML = sortedClasses.map((oseClass, index) => {
        const classId = `allowedClass${index}`;
        const sourceGroup = getSourceGroup(oseClass.source);

        return `<label for="${classId}"><input type="checkbox" id="${classId}" value="${oseClass.name}" data-source="${sourceGroup}" checked> ${oseClass.name}</label>`;
    }).join("");
}

function generateCharacters(event) {
    event.preventDefault();

    const numCharacters = parseInt(document.getElementById("numCharacters").value, 10);
    const minScoreTotal = parseInt(document.getElementById("minScoreTotal").value, 10);
    const charactersElement = document.getElementById("characters");
    const copyCharactersButton = document.getElementById("copyCharacters");
    const copyCharactersStatus = document.getElementById("copyCharactersStatus");
    const allowedClassesElement = document.getElementById("allowedClasses");
    const allowedClassNames = allowedClassesElement !== null
        ? getAllowedClassNames(allowedClassesElement)
        : [];

    if (allowedClassNames.length === 0) {
        if (charactersElement !== null) {
            charactersElement.innerHTML = "<p>Select at least one allowed class.</p>";
        }
        setCopyState(copyCharactersButton, copyCharactersStatus, false, "");
        return;
    }

    const config = {
        count: numCharacters,
        minScoreTotal,
        allowedClassNames,
        level: 1
    };

    const deps = {
        rng: Math.random.bind(Math),
        getSingleName,
        rollBackground
    };

    lastGeneratedCharacters = generateCharacterBatch(config, deps);

    if (charactersElement !== null) {
        charactersElement.innerHTML = lastGeneratedCharacters.length > 0
            ? renderCharactersTable(lastGeneratedCharacters)
            : "<p>No characters could be generated with the current constraints.</p>";
    }

    setCopyState(copyCharactersButton, copyCharactersStatus, lastGeneratedCharacters.length > 0, "");
}

async function copyCharactersHandler() {
    const copyCharactersButton = document.getElementById("copyCharacters");
    const copyCharactersStatus = document.getElementById("copyCharactersStatus");

    if (lastGeneratedCharacters.length === 0) {
        setCopyState(copyCharactersButton, copyCharactersStatus, false, "Generate characters first.");
        return;
    }

    try {
        await copyCharacters(lastGeneratedCharacters, writeClipboardText);
        setCopyState(copyCharactersButton, copyCharactersStatus, true, "Character table copied.");
    } catch (error) {
        console.error("Failed to copy character table.", error);
        setCopyState(copyCharactersButton, copyCharactersStatus, true, "Clipboard copy failed.");
    }
}
