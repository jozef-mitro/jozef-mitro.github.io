import test from "node:test";
import assert from "node:assert/strict";
import { getSeasonFlower } from "../js/weather-flower.js";

const listeners = {};
const svg = {
    innerHTML: "",
    setAttribute() {}
};
const select = {
    value: "spring",
    innerHTML: "",
    addEventListener(event, callback) {
        listeners[event] = callback;
    }
};
const elements = {
    weatherGeneratorForm: { addEventListener() {} },
    weatherSeason: select,
    copyWeather: { addEventListener() {} },
    weatherFlower: svg,
    weatherForecast: { innerHTML: "" },
    weatherStatus: { textContent: "" }
};
globalThis.document = {
    addEventListener(event, callback) {
        listeners[event] = callback;
    },
    getElementById(id) {
        return elements[id] ?? null;
    }
};
await import("../js/weather-generator.js");
listeners.DOMContentLoaded();

const edgeVertices = {
    north: [0, 1],
    northeast: [1, 2],
    southeast: [2, 3],
    south: [3, 4],
    southwest: [4, 5],
    northwest: [5, 0]
};
const near = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.001;

for (const season of ["spring", "summer", "autumn", "winter"]) {
    test(`${season} boundary markers meet at shared vertices`, () => {
        select.value = season;
        listeners.change();
        const flower = getSeasonFlower(season);
        const polygons = [...svg.innerHTML.matchAll(/<polygon class="weather-hex__shape" points="([^"]+)"/g)]
            .map(match => match[1].split(" ").map(point => point.split(",").map(Number)));
        const lines = [...svg.innerHTML.matchAll(/<line class="weather-hex__boundary" x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"/g)]
            .map(match => [[Number(match[1]), Number(match[2])], [Number(match[3]), Number(match[4])]]);
        assert.equal(polygons.length, flower.cells.length);
        assert.equal(lines.length, flower.blockedEdges.length);

        const original = flower.blockedEdges.map(edge => {
            const cell = flower.cells.findIndex(candidate => candidate.q === edge.q && candidate.r === edge.r);
            return edgeVertices[edge.direction].map(vertex => polygons[cell][vertex]);
        });
        let joins = 0;
        for (let i = 0; i < original.length; i += 1) {
            for (let j = i + 1; j < original.length; j += 1) {
                for (let a = 0; a < 2; a += 1) {
                    for (let b = 0; b < 2; b += 1) {
                        if (near(original[i][a], original[j][b])) {
                            joins += 1;
                            assert.ok(near(lines[i][a], lines[j][b]), `Markers ${i} and ${j} do not join`);
                        }
                    }
                }
            }
        }
        if (season === "autumn") {
            assert.equal(joins, 3);
        }
    });
}
