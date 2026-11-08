import { writeClipboardText } from "./utils.js";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MOON_PHASES = ["Full Moon", "Third Quarter", "New Moon", "First Quarter"];
const TABLE_HEADERS = ["Day #", "Date", "Day of the Week", "Moon Phase", "Weather", "Notes"];

let lastGeneratedCalendar = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calendarGeneratorForm")?.addEventListener("submit", generateCalendar);
    document.getElementById("copyCalendar")?.addEventListener("click", copyCalendar);
});

function generateCalendar(event) {
    event.preventDefault();

    const firstDateOffset = Math.floor(Math.random() * 365);
    const firstWeekdayOffset = Math.floor(Math.random() * DAYS_OF_WEEK.length);
    const firstMoonPosition = Math.floor(Math.random() * 28);
    const calendarStart = new Date(Date.UTC(2025, 0, 1 + firstDateOffset));

    lastGeneratedCalendar = Array.from({ length: 365 }, (_, index) => {
        const date = new Date(calendarStart);
        date.setUTCDate(calendarStart.getUTCDate() + index);
        const moonPosition = (firstMoonPosition + index) % 28;

        return {
            day: index + 1,
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
            weekday: DAYS_OF_WEEK[(firstWeekdayOffset + index) % DAYS_OF_WEEK.length],
            moonPhase: moonPosition % 7 === 0 ? MOON_PHASES[moonPosition / 7] : "",
            weather: "",
            notes: ""
        };
    });

    const calendarElement = document.getElementById("calendar");
    if (calendarElement !== null) {
        calendarElement.innerHTML = renderCalendarTable(lastGeneratedCalendar);
    }

    setCopyState(true, "");
}

async function copyCalendar() {
    if (lastGeneratedCalendar.length === 0) {
        setCopyState(false, "Generate a calendar first.");
        return;
    }

    try {
        const tsv = lastGeneratedCalendar
            .map(day => [day.day, day.date, day.weekday, day.moonPhase, day.weather, day.notes].join("\t"))
            .join("\n");
        await writeClipboardText(tsv);
        setCopyState(true, "Calendar copied.");
    } catch (error) {
        console.error("Failed to copy calendar.", error);
        setCopyState(true, "Clipboard copy failed.");
    }
}

function renderCalendarTable(days) {
    const headers = TABLE_HEADERS.map(header => `<th>${header}</th>`).join("");
    const rows = days.map(day => `
        <tr>
            <td>${day.day}</td>
            <td>${day.date}</td>
            <td>${day.weekday}</td>
            <td>${day.moonPhase}</td>
            <td>${day.weather}</td>
            <td>${day.notes}</td>
        </tr>`).join("");

    return `
        <table class="stat-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function setCopyState(isEnabled, message) {
    const copyButton = document.getElementById("copyCalendar");
    const status = document.getElementById("copyCalendarStatus");

    if (copyButton !== null) {
        copyButton.disabled = !isEnabled;
    }
    if (status !== null) {
        status.textContent = message;
    }
}