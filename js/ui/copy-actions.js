import { charactersToTsv } from "./character-table.js";

/**
 * Copies characters as TSV to the clipboard using the provided write function.
 * @param {import("../generator/types.js").Character[]} characters
 * @param {(text: string) => Promise<void>} writeClipboard
 * @returns {Promise<void>}
 */
export async function copyCharacters(characters, writeClipboard) {
    const tsv = charactersToTsv(characters);
    await writeClipboard(tsv);
}

/**
 * Updates a copy button and optional status element.
 * @param {HTMLButtonElement | null} buttonEl
 * @param {HTMLElement | null} statusEl
 * @param {boolean} isEnabled
 * @param {string} message
 */
export function setCopyState(buttonEl, statusEl, isEnabled, message) {
    if (buttonEl !== null) {
        buttonEl.disabled = !isEnabled;
    }

    if (statusEl !== null) {
        statusEl.textContent = message;
    }
}
