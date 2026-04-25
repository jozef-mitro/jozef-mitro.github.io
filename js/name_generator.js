import { getAllNames } from "./names.js";
import { writeClipboardText } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const nameForm = document.getElementById("nameGeneratorForm");
    const copyNamesButton = document.getElementById("copyNames");

    if (nameForm !== null) {
        nameForm.addEventListener("submit", generateNames);
    }

    if (copyNamesButton !== null) {
        copyNamesButton.addEventListener("click", copyNamesTable);
    }
});

function generateNames(event) {
    event.preventDefault();
    
    let numNames = document.getElementById("numNames").value;
    let nameType = document.getElementById("nameType").value;
    let possibleNames = getAllNames(nameType);
    let pickedNames = [];

    for (let i = 0; i < numNames; i++) {
        let index = Math.floor(Math.random() * possibleNames.length);
        pickedNames.push(possibleNames[index]);
        possibleNames.splice(index, 1);
    }

    let namesElement = document.getElementById("names");
    const rows = pickedNames.map(name => `<tr><td>${name}</td></tr>`).join("");
    namesElement.innerHTML = `
        <table class="stat-table">
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

    setCopyNamesEnabled(pickedNames.length > 0);
    setCopyNamesStatus("");
}

async function copyNamesTable() {
    const table = document.querySelector("#names table");

    if (table === null) {
        setCopyNamesStatus("Generate names first.");
        return;
    }

    const tableText = Array.from(table.tBodies[0]?.rows ?? [], row =>
        row.cells[0].textContent.trim()
    ).join("\n");

    try {
        await writeClipboardText(tableText);
        setCopyNamesStatus("Names copied.");
    } catch (error) {
        console.error("Failed to copy names.", error);
        setCopyNamesStatus("Clipboard copy failed.");
    }
}

function setCopyNamesEnabled(isEnabled) {
    const copyNamesButton = document.getElementById("copyNames");

    if (copyNamesButton !== null) {
        copyNamesButton.disabled = !isEnabled;
    }
}

function setCopyNamesStatus(message) {
    const copyNamesStatus = document.getElementById("copyNamesStatus");

    if (copyNamesStatus !== null) {
        copyNamesStatus.textContent = message;
    }
}
