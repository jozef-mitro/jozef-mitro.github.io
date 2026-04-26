import { SOURCES } from "../constants/sources.js";

/**
 * @param {string} sourceText
 * @returns {string}
 */
function getSourceGroup(sourceText) {
    for (const { source } of SOURCES) {
        if (sourceText.startsWith(source)) {
            return source;
        }
    }
    return "";
}

/**
 * @param {HTMLElement} containerElement
 * @param {string} sourceName
 * @param {boolean} isChecked
 */
function syncClassesForSource(containerElement, sourceName, isChecked) {
    containerElement
        .querySelectorAll(`input[type="checkbox"][data-source="${sourceName}"]`)
        .forEach(cb => { cb.checked = isChecked; });
}

/**
 * @param {HTMLElement} containerElement
 * @param {{ id: string, source: string }} sourceConfig
 */
function updateSourceCheckboxState(containerElement, sourceConfig) {
    const sourceCheckbox = document.getElementById(sourceConfig.id);

    if (sourceCheckbox === null) {
        return;
    }

    const classCheckboxes = Array.from(
        containerElement.querySelectorAll(`input[type="checkbox"][data-source="${sourceConfig.source}"]`)
    );

    if (classCheckboxes.length === 0) {
        sourceCheckbox.checked = false;
        sourceCheckbox.indeterminate = false;
        return;
    }

    const checkedCount = classCheckboxes.filter(cb => cb.checked).length;

    if (checkedCount === 0) {
        sourceCheckbox.checked = false;
        sourceCheckbox.indeterminate = false;
    } else if (checkedCount === classCheckboxes.length) {
        sourceCheckbox.checked = true;
        sourceCheckbox.indeterminate = false;
    } else {
        sourceCheckbox.checked = false;
        sourceCheckbox.indeterminate = true;
    }
}

/**
 * Wires source/class checkbox synchronization and runs initial sync.
 * @param {{ allowedClassesElement: HTMLElement }} rootElements
 */
export function initSourceClassSync(rootElements) {
    const { allowedClassesElement } = rootElements;

    SOURCES.forEach(sourceConfig => {
        const sourceCheckbox = document.getElementById(sourceConfig.id);

        if (sourceCheckbox === null) {
            return;
        }

        sourceCheckbox.addEventListener("change", () => {
            sourceCheckbox.indeterminate = false;
            syncClassesForSource(allowedClassesElement, sourceConfig.source, sourceCheckbox.checked);
        });
    });

    allowedClassesElement.addEventListener("change", event => {
        const target = event.target;

        if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
            return;
        }

        const sourceName = target.dataset.source || "";

        if (sourceName.length === 0) {
            return;
        }

        const sourceConfig = SOURCES.find(c => c.source === sourceName);

        if (sourceConfig !== undefined) {
            updateSourceCheckboxState(allowedClassesElement, sourceConfig);
        }
    });

    // Initial sync: apply each source checkbox's current state to its class checkboxes,
    // then recompute indeterminate states.
    SOURCES.forEach(sourceConfig => {
        const sourceCheckbox = document.getElementById(sourceConfig.id);

        if (sourceCheckbox !== null) {
            syncClassesForSource(allowedClassesElement, sourceConfig.source, sourceCheckbox.checked);
        }
    });

    SOURCES.forEach(sourceConfig => updateSourceCheckboxState(allowedClassesElement, sourceConfig));
}

/**
 * Returns the names of all checked class checkboxes inside the container.
 * @param {HTMLElement} containerElement
 * @returns {string[]}
 */
export function getAllowedClassNames(containerElement) {
    return Array.from(
        containerElement.querySelectorAll("input[type=\"checkbox\"]:checked"),
        cb => cb.value
    );
}

export { getSourceGroup };
