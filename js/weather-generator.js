import { writeClipboardText } from "./utils.js";
import { generateSeasonForecast, getSeasonFlower, WEATHER_DIRECTIONS, WEATHER_SEASONS } from "./weather-flower.js";

let lastForecast = [];

const HEX_RADIUS = 56;
const HEX_HALF_HEIGHT = HEX_RADIUS * Math.sqrt(3) / 2;
const FLOWER_CENTER_X = 260;
const FLOWER_CENTER_Y = 260 - 2 * HEX_HALF_HEIGHT;
const HEX_EDGES = {
    north: [0, 1],
    northeast: [1, 2],
    southeast: [2, 3],
    south: [3, 4],
    southwest: [4, 5],
    northwest: [5, 0]
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("weatherGeneratorForm");
    const seasonSelect = document.getElementById("weatherSeason");
    const copyButton = document.getElementById("copyWeather");

    form?.addEventListener("submit", generateWeather);
    seasonSelect?.addEventListener("change", () => {
        lastForecast = [];
        const forecastElement = document.getElementById("weatherForecast");
        if (forecastElement !== null) {
            forecastElement.innerHTML = "<p>Generate a forecast to see daily weather.</p>";
        }
        setCopyState(false, "");
        renderFlower(seasonSelect.value, null);
    });
    copyButton?.addEventListener("click", copyForecast);

    if (seasonSelect !== null) {
        seasonSelect.innerHTML = WEATHER_SEASONS.map(season =>
            `<option value="${season.id}">${season.label}</option>`
        ).join("");
        renderFlower(seasonSelect.value, null);
    }
});

function generateWeather(event) {
    event.preventDefault();

    const season = document.getElementById("weatherSeason").value;
    const dayCount = Number.parseInt(document.getElementById("weatherDays").value, 10);
    const forecastElement = document.getElementById("weatherForecast");

    if (!Number.isInteger(dayCount) || dayCount < 1 || dayCount > 365) {
        setWeatherStatus("Choose a forecast length from 1 to 365 days.");
        return;
    }

    lastForecast = generateSeasonForecast(season, dayCount);
    if (forecastElement !== null) {
        forecastElement.innerHTML = renderForecastTable(lastForecast);
    }
    renderFlower(season, lastForecast[lastForecast.length - 1].cell);
    setCopyState(true, "");
}

async function copyForecast() {
    if (lastForecast.length === 0) {
        setWeatherStatus("Generate a forecast first.");
        return;
    }

    const tsv = [
        ["Day", "Roll", "Weather", "Conditions"],
        ...lastForecast.map(day => [
            day.day,
            `${day.roll} (${day.rollType.toLowerCase()})`,
            day.cell.label,
            day.cell.severity ? "Severe or hindering" : ""
        ])
    ].map(row => row.join("\t")).join("\n");

    try {
        await writeClipboardText(tsv);
        setWeatherStatus("Forecast copied.");
    } catch (error) {
        console.error("Failed to copy weather forecast.", error);
        setWeatherStatus("Clipboard copy failed.");
    }
}

function renderForecastTable(forecast) {
    const rows = forecast.map(day => `
        <tr>
            <td>${day.day}</td>
            <td>${day.roll} <span class="weather-roll-type">(${day.rollType.toLowerCase()})</span></td>
            <td>${escapeHtml(day.cell.label)}${day.cell.severity ? ` ${renderSeverity(day.cell.severity)}` : ""}</td>
        </tr>`).join("");

    return `
        <table class="stat-table">
            <thead><tr><th>Day</th><th>2d6 roll</th><th>Weather</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function renderFlower(seasonId, currentCell) {
    const season = getSeasonFlower(seasonId);
    const svg = document.getElementById("weatherFlower");
    if (svg === null) {
        return;
    }

    const cells = season.cells.map(cell => {
        const x = FLOWER_CENTER_X + cell.q * HEX_RADIUS * 1.5;
        const y = FLOWER_CENTER_Y + cell.r * HEX_HALF_HEIGHT;
        const labelLines = wrapLabel(cell.label);
        const firstLineY = y - ((labelLines.length - 1) * 7);
        const isCurrent = currentCell !== null
            && currentCell.q === cell.q && currentCell.r === cell.r;
        const blockedDirections = season.blockedEdges
            .filter(edge => edge.q === cell.q && edge.r === cell.r)
            .map(edge => edge.direction);
        const title = `${cell.label}${cell.startRoll === null ? "" : `; season-start roll ${cell.startRoll}`}`
            + `${cell.severity ? "; severe or hindering conditions" : ""}`
            + `${blockedDirections.length ? `; blocked edges: ${blockedDirections.join(", ")}` : ""}`;
        const labels = labelLines.map((line, index) =>
            `<tspan x="${x}" y="${firstLineY + index * 14}">${escapeHtml(line)}</tspan>`
        ).join("");

        return `
            <g class="weather-hex${isCurrent ? " weather-hex--current" : ""}${cell.severity ? " weather-hex--severe" : ""}" aria-label="${escapeHtml(title)}">
                <title>${escapeHtml(title)}</title>
                <polygon class="weather-hex__shape" points="${hexPoints(x, y)}"></polygon>
                ${cell.startRoll === null ? "" : `
                    <circle class="weather-hex__roll-marker" cx="${x - 24}" cy="${y - 29}" r="9"></circle>
                    <text class="weather-hex__roll" x="${x - 24}" y="${y - 25}">${cell.startRoll}</text>`}
                <text class="weather-hex__label">${labels}</text>
                ${cell.severity ? `<text class="weather-hex__severity" x="${x + 27}" y="${y + 34}">${cell.severity}</text>` : ""}
            </g>`;
    }).join("");

    const segments = season.blockedEdges.map(edge => {
        const x = FLOWER_CENTER_X + edge.q * HEX_RADIUS * 1.5;
        const y = FLOWER_CENTER_Y + edge.r * HEX_HALF_HEIGHT;
        const points = hexVertices(x, y);
        const [start, end] = HEX_EDGES[edge.direction];
        const [qOffset, rOffset] = WEATHER_DIRECTIONS[edge.direction];
        const dx = qOffset * HEX_RADIUS * 1.5;
        const dy = rOffset * HEX_HALF_HEIGHT;
        const distance = Math.hypot(dx, dy);
        const offsetX = 7 * dx / distance;
        const offsetY = 7 * dy / distance;
        return {
            vertices: [points[start], points[end]],
            points: [points[start], points[end]].map(([pointX, pointY]) => [pointX + offsetX, pointY + offsetY])
        };
    });
    joinBoundarySegments(segments);
    const lines = segments.map(({ points }) =>
        `<line class="weather-hex__boundary" x1="${points[0][0]}" y1="${points[0][1]}" x2="${points[1][0]}" y2="${points[1][1]}"></line>`
    ).join("");

    svg.setAttribute("class", `weather-flower weather-flower--${seasonId}`);
    svg.innerHTML = `<title>${season.label} weather flower</title>${cells}${lines}`;
}

function joinBoundarySegments(segments) {
    for (let i = 0; i < segments.length; i += 1) {
        for (let j = i + 1; j < segments.length; j += 1) {
            const first = segments[i];
            const second = segments[j];
            for (let a = 0; a < 2; a += 1) {
                for (let b = 0; b < 2; b += 1) {
                    if (Math.hypot(
                        first.vertices[a][0] - second.vertices[b][0],
                        first.vertices[a][1] - second.vertices[b][1]
                    ) > 0.001) {
                        continue;
                    }

                    const firstPoint = first.points[a];
                    const secondPoint = second.points[b];
                    const firstDirection = first.vertices[1].map((value, index) => value - first.vertices[0][index]);
                    const secondDirection = second.vertices[1].map((value, index) => value - second.vertices[0][index]);
                    const cross = firstDirection[0] * secondDirection[1] - firstDirection[1] * secondDirection[0];
                    let join;
                    if (Math.abs(cross) < 0.001) {
                        join = firstPoint.map((value, index) => (value + secondPoint[index]) / 2);
                    } else {
                        const dx = secondPoint[0] - firstPoint[0];
                        const dy = secondPoint[1] - firstPoint[1];
                        const distance = (dx * secondDirection[1] - dy * secondDirection[0]) / cross;
                        join = firstPoint.map((value, index) => value + distance * firstDirection[index]);
                    }
                    first.points[a] = join;
                    second.points[b] = join;
                }
            }
        }
    }
}

function renderSeverity(severity) {
    return severity
        ? `<span class="weather-severity" aria-label="severe or hindering conditions">${severity}</span>`
        : "";
}

function hexPoints(x, y) {
    return hexVertices(x, y).map(([pointX, pointY]) => `${pointX},${pointY}`).join(" ");
}

function hexVertices(x, y) {
    return [
        [x - HEX_RADIUS / 2, y - HEX_HALF_HEIGHT],
        [x + HEX_RADIUS / 2, y - HEX_HALF_HEIGHT],
        [x + HEX_RADIUS, y],
        [x + HEX_RADIUS / 2, y + HEX_HALF_HEIGHT],
        [x - HEX_RADIUS / 2, y + HEX_HALF_HEIGHT],
        [x - HEX_RADIUS, y]
    ];
}

function wrapLabel(label) {
    const lines = [];
    let line = "";
    label.split(" ").forEach(word => {
        if (line.length > 0 && line.length + word.length + 1 > 13) {
            lines.push(line);
            line = word;
        } else {
            line = line.length > 0 ? `${line} ${word}` : word;
        }
    });
    if (line.length > 0) {
        lines.push(line);
    }
    return lines;
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}

function setCopyState(isEnabled, message) {
    const copyButton = document.getElementById("copyWeather");
    if (copyButton !== null) {
        copyButton.disabled = !isEnabled;
    }
    setWeatherStatus(message);
}

function setWeatherStatus(message) {
    const status = document.getElementById("weatherStatus");
    if (status !== null) {
        status.textContent = message;
    }
}
