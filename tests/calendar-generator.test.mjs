import test from "node:test";
import assert from "node:assert/strict";

const listeners = {};
const elements = {
    calendarGeneratorForm: {
        addEventListener(event, callback) {
            listeners[event] = callback;
        }
    },
    includeWeather: { checked: true },
    calendar: { innerHTML: "" },
    copyCalendar: {
        disabled: true,
        addEventListener(event, callback) {
            listeners[event] = callback;
        }
    },
    copyCalendarStatus: { textContent: "" }
};

let copiedText = "";
Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { clipboard: {
        async writeText(text) {
            copiedText = text;
        }
    } }
});
globalThis.document = {
    addEventListener(event, callback) {
        listeners[event] = callback;
    },
    getElementById(id) {
        return elements[id] ?? null;
    }
};

await import("../js/calendar-generator.js");
listeners.DOMContentLoaded();

test("calendar optionally generates and copies weather", async () => {
    const originalRandom = Math.random;
    let randomCalls = 0;
    Math.random = () => {
        randomCalls += 1;
        return 0;
    };

    try {
        for (const enabled of [true, false, true]) {
            elements.includeWeather.checked = enabled;
            randomCalls = 0;
            listeners.submit({ preventDefault() {} });
            const rows = [...elements.calendar.innerHTML.matchAll(/<tr>\s*<td>(\d+)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/g)];
            assert.equal(rows.length, 365);
            assert.ok(rows.every(row => enabled ? row[5].length > 0 : row[5] === ""));
            assert.equal(randomCalls, enabled ? 733 : 3);
            assert.equal(elements.copyCalendar.disabled, false);

            await listeners.click();
            const copiedRows = copiedText.split("\n").map(row => row.split("\t"));
            assert.equal(copiedRows.length, 365);
            assert.ok(copiedRows.every(row => row.length === 6));
            assert.deepEqual(copiedRows.map(row => row[4]), rows.map(row => row[5]));
            assert.equal(elements.copyCalendarStatus.textContent, "Calendar copied.");
        }
    } finally {
        Math.random = originalRandom;
    }
});
