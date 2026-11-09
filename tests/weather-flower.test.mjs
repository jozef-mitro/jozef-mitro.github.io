import test from "node:test";
import assert from "node:assert/strict";
import {
    generateCalendarWeather,
    generateSeasonForecast,
    getSeasonFlower
} from "../js/weather-flower.js";

const directions = [
    { name: "northwest", rolls: [2, 12], q: -1, r: -1 },
    { name: "southwest", rolls: [3, 4], q: -1, r: 1 },
    { name: "south", rolls: [5, 6], q: 0, r: 2 },
    { name: "southeast", rolls: [7], q: 1, r: 1 },
    { name: "northeast", rolls: [8], q: 1, r: -1 },
    { name: "north", rolls: [11], q: 0, r: -2 }
];

const markedEdges = {
    spring: [
        "-1,-1,north", "0,-2,north", "2,0,northeast", "2,2,northeast",
        "1,5,southeast", "0,6,south", "-1,5,south", "-1,5,southwest",
        "-2,4,southwest", "-2,2,northwest"
    ],
    summer: [
        "-1,-1,north", "0,-2,north", "1,-1,north", "2,0,northeast",
        "1,5,south", "0,6,south", "-1,5,south", "-2,4,southwest"
    ],
    autumn: [
        "-2,0,north", "-1,-1,north", "-1,-1,northwest", "0,-2,northwest",
        "2,0,southeast", "2,2,southeast", "-2,4,south", "-1,5,south"
    ],
    winter: [
        "-1,-1,north", "0,-2,north", "2,0,northeast",
        "-2,4,southwest", "-1,5,south", "0,6,south"
    ]
};

function rngForRolls(rolls) {
    const dice = rolls.flatMap(roll => {
        const first = Math.min(6, roll - 1);
        return [first, roll - first];
    });
    let index = 0;
    return () => {
        assert.ok(index < dice.length, "Unexpected extra die roll");
        return (dice[index++] - 0.5) / 6;
    };
}

function key(cell) {
    return `${cell.q},${cell.r}`;
}

function pathsFromStart(cells) {
    const start = cells.find(cell => cell.startRoll === 5);
    const paths = new Map([[key(start), []]]);
    const queue = [start];
    for (let index = 0; index < queue.length; index += 1) {
        const cell = queue[index];
        for (const direction of directions) {
            const neighbor = cells.find(candidate =>
                candidate.q === cell.q + direction.q && candidate.r === cell.r + direction.r
            );
            if (neighbor && !paths.has(key(neighbor))) {
                paths.set(key(neighbor), [...paths.get(key(cell)), direction.rolls[0]]);
                queue.push(neighbor);
            }
        }
    }
    return paths;
}

for (const [season, expectedEdges] of Object.entries(markedEdges)) {
    test(`${season} follows all marked and unmarked boundaries`, () => {
        const flower = getSeasonFlower(season);
        const cells = flower.cells;
        const expected = new Set(expectedEdges);
        const actual = flower.blockedEdges.map(edge => `${edge.q},${edge.r},${edge.direction}`);
        assert.deepEqual(new Set(actual), expected);
        assert.equal(actual.length, expected.size, "No duplicate marked edges");

        const paths = pathsFromStart(cells);
        assert.equal(paths.size, 19, "All hexes are reachable through interior edges");
        let boundaryCount = 0;
        for (const cell of cells) {
            for (const direction of directions) {
                const next = cells.find(candidate =>
                    candidate.q === cell.q + direction.q && candidate.r === cell.r + direction.r
                );
                let expectedCell = next;
                if (!next) {
                    boundaryCount += 1;
                    expectedCell = cell;
                    if (!expected.has(`${cell.q},${cell.r},${direction.name}`)) {
                        let previous;
                        while ((previous = cells.find(candidate =>
                            candidate.q === expectedCell.q - direction.q
                            && candidate.r === expectedCell.r - direction.r
                        ))) {
                            expectedCell = previous;
                        }
                    }
                } else {
                    assert.ok(!expected.has(`${cell.q},${cell.r},${direction.name}`), "Marked edges must be exterior");
                }

                for (const roll of direction.rolls) {
                    const rolls = [5, ...paths.get(key(cell)), roll];
                    const forecast = generateSeasonForecast(season, rolls.length, rngForRolls(rolls));
                    assert.equal(key(forecast.at(-1).cell), key(expectedCell),
                        `${key(cell)} moving ${direction.name} on ${roll}`);
                }
            }
        }
        assert.equal(boundaryCount, 30);
    });
}

test("rolls of 9 and 10 repeat without moving", () => {
    const forecast = generateSeasonForecast("spring", 3, rngForRolls([2, 9, 10]));
    assert.deepEqual(forecast.map(day => day.cell.label), ["Windy & Snowy", "Windy & Snowy", "Windy & Snowy"]);
});

test("calendar uses blocked and wrapped moves and restarts at the season change", () => {
    const dates = [26, 27, 28].map(day => ({ date: new Date(Date.UTC(2025, 1, day)) }));
    dates.push(...[1, 2].map(day => ({ date: new Date(Date.UTC(2025, 2, day)) })));
    const forecast = generateCalendarWeather(dates, rngForRolls([6, 11, 8, 2, 2]));
    assert.deepEqual(forecast.map(day => [day.season, day.weather, day.rollType]), [
        ["winter", "Sunny & Nippy", "Season start"],
        ["winter", "Sunny & Nippy", "Movement"],
        ["winter", "Cold & Clear", "Movement"],
        ["spring", "Windy & Snowy", "Season start"],
        ["spring", "Snowy Rain", "Movement"]
    ]);
});
