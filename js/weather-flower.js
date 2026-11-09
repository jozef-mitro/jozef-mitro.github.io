const seasons = [
    {
        id: "spring",
        label: "Spring",
        blockedEdges: [
            [-1, -1, "north"], [0, -2, "north"],
            [2, 0, "northeast"], [2, 2, "northeast"],
            [1, 5, "southeast"], [0, 6, "south"],
            [-1, 5, "south"], [-1, 5, "southwest"],
            [-2, 4, "southwest"], [-2, 2, "northwest"]
        ],
        cells: [
            [-2, 0, "Warm Drizzle"],
            [-2, 2, "Warm & Humid", 11],
            [-2, 4, "Hot & Dry", null, "!"],
            [-1, -1, "Short Showers", 3],
            [-1, 1, "Nippy & Humid", 12],
            [-1, 3, "Cloudy & Warm", 10],
            [-1, 5, "Strong Pollen Drift", null, "!"],
            [0, -2, "Heavy Rainfall", null, "!"],
            [0, 0, "Sleet"],
            [0, 2, "Clear & Nippy", 5],
            [0, 4, "Sunny & Clear", 9],
            [0, 6, "Pleasantly Warm"],
            [1, -1, "Snowy Rain", null, "!"],
            [1, 1, "Hail", 6, "!"],
            [1, 3, "Cold Wafts of Mist"],
            [1, 5, "Coldy & Dry", 8],
            [2, 0, "Windy & Snowy", 2],
            [2, 2, "Heavy Snowfall", 4, "!"],
            [2, 4, "Light Snowfall", 7, "!"]
        ]
    },
    {
        id: "summer",
        label: "Summer",
        blockedEdges: [
            [-1, -1, "north"], [0, -2, "north"], [1, -1, "north"],
            [2, 0, "northeast"], [1, 5, "south"], [0, 6, "south"],
            [-1, 5, "south"], [-2, 4, "southwest"]
        ],
        cells: [
            [-2, 0, "Warm Rain"],
            [-2, 2, "Warm Drizzle", 12],
            [-2, 4, "Hot & Muggy", null, "!"],
            [-1, -1, "Downpour"],
            [-1, 1, "Short, Warm Showers", 2],
            [-1, 3, "Warm & Cloudy", 9],
            [-1, 5, "Hot & Windy", 11, "!"],
            [0, -2, "Torrential Rain", null, "!!"],
            [0, 0, "Cloudy & Humid"],
            [0, 2, "Pleasantly Warm"],
            [0, 4, "Hot & Dry", 5, "!"],
            [0, 6, "Dry Heat Surges", 10, "!!"],
            [1, -1, "Warm Storm", null, "!!"],
            [1, 1, "Cloudy & Windy", 3],
            [1, 3, "Warm Breeze", 6],
            [1, 5, "Sunny & Clear", 7],
            [2, 0, "Fierce Wind", null, "!"],
            [2, 2, "Partly Cloudy & Nippy", 4],
            [2, 4, "Clear & Nippy", 8]
        ]
    },
    {
        id: "autumn",
        label: "Autumn",
        blockedEdges: [
            [-2, 0, "north"], [-1, -1, "north"], [-1, -1, "northwest"],
            [0, -2, "northwest"], [2, 0, "southeast"],
            [2, 2, "southeast"], [-2, 4, "south"], [-1, 5, "south"]
        ],
        cells: [
            [-2, 0, "Sunny & Nippy"],
            [-2, 2, "Drizzle"],
            [-2, 4, "Rainy Windstorm", null, "!!"],
            [-1, -1, "Pleasantly Warm", 11],
            [-1, 1, "Sunny & Cloudy"],
            [-1, 3, "Rain & Gusts"],
            [-1, 5, "Heavy Downpour", 2, "!"],
            [0, -2, "Goose Summer", 12],
            [0, 0, "Sunny & Clear", 10],
            [0, 2, "Humid & Cloudy"],
            [0, 4, "Rain & Fog", 5, "!"],
            [0, 6, "Short, Light Showers", 9, "!"],
            [1, -1, "Sporadic Gusts", null, "!"],
            [1, 1, "Cold Wafts of Mist", 3],
            [1, 3, "Thick Fog Soup", 4, "!"],
            [1, 5, "Windy & Clear", 8],
            [2, 0, "Cold Winds"],
            [2, 2, "Frosty & Cloudy", 6],
            [2, 4, "Cloudy & Nippy", 7]
        ]
    },
    {
        id: "winter",
        label: "Winter",
        blockedEdges: [
            [-1, -1, "north"], [0, -2, "north"], [2, 0, "northeast"],
            [-2, 4, "southwest"], [-1, 5, "south"], [0, 6, "south"]
        ],
        cells: [
            [-2, 0, "Cold & Clear", 8],
            [-2, 2, "Hail", 3, "!"],
            [-2, 4, "Blizzard", 2, "!!"],
            [-1, -1, "Cloudy & Nippy", 7],
            [-1, 1, "Clear & Windy", 9],
            [-1, 3, "Snowy Rain"],
            [-1, 5, "Windy & Snowy", null, "!"],
            [0, -2, "Sunny & Nippy", 6],
            [0, 0, "Cold Fog Wafts", 10],
            [0, 2, "Cold & Humid"],
            [0, 4, "Wet Snowfall", 5, "!"],
            [0, 6, "Light Snowfall", 4, "!"],
            [1, -1, "Light Drizzle"],
            [1, 1, "Cold Rain Showers", 11, "!"],
            [1, 3, "Cold & Cloudy"],
            [1, 5, "Sleet"],
            [2, 0, "Heavy Rain", null, "!"],
            [2, 2, "Cold Winds", 12],
            [2, 4, "Icy & Cloudy"]
        ]
    }
].map(season => ({
    ...season,
    blockedEdges: season.blockedEdges.map(([q, r, direction]) => ({ q, r, direction })),
    cells: season.cells.map(([q, r, label, startRoll = null, severity = ""]) => ({
        q,
        r,
        label,
        startRoll,
        severity
    }))
}));

export const WEATHER_SEASONS = seasons.map(({ id, label }) => ({ id, label }));

const seasonsById = new Map(seasons.map(season => [season.id, season]));
export const WEATHER_DIRECTIONS = {
    northwest: [-1, -1],
    southwest: [-1, 1],
    south: [0, 2],
    southeast: [1, 1],
    northeast: [1, -1],
    north: [0, -2]
};

const movementDirections = new Map([
    [2, "northwest"],
    [12, "northwest"],
    [3, "southwest"],
    [4, "southwest"],
    [5, "south"],
    [6, "south"],
    [7, "southeast"],
    [8, "northeast"],
    [11, "north"]
]);

export function getMeteorologicalSeason(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        throw new TypeError("A valid Date is required to determine the season.");
    }

    const month = date.getUTCMonth();
    if (month >= 2 && month <= 4) {
        return "spring";
    }
    if (month >= 5 && month <= 7) {
        return "summer";
    }
    if (month >= 8 && month <= 10) {
        return "autumn";
    }
    return "winter";
}

export function generateSeasonForecast(seasonId, dayCount, rng = Math.random) {
    const season = getSeason(seasonId);
    if (!Number.isInteger(dayCount) || dayCount < 1 || dayCount > 365) {
        throw new RangeError("Forecast length must be between 1 and 365 days.");
    }

    const start = getStartingCell(season, rng);
    let currentCell = start.cell;
    const forecast = [{
        day: 1,
        roll: start.roll,
        rollType: "Season start",
        cell: currentCell
    }];

    for (let day = 2; day <= dayCount; day += 1) {
        const roll = roll2d6(rng);
        currentCell = moveToWeather(season, currentCell, roll);
        forecast.push({
            day,
            roll,
            rollType: "Movement",
            cell: currentCell
        });
    }

    return forecast;
}

export function generateCalendarWeather(days, rng = Math.random) {
    let currentSeason = null;
    let currentCell = null;

    return days.map(day => {
        const seasonId = getMeteorologicalSeason(day.date);
        let roll;
        let rollType;

        if (seasonId !== currentSeason) {
            const start = getStartingCell(getSeason(seasonId), rng);
            currentCell = start.cell;
            roll = start.roll;
            rollType = "Season start";
            currentSeason = seasonId;
        } else {
            roll = roll2d6(rng);
            currentCell = moveToWeather(getSeason(seasonId), currentCell, roll);
            rollType = "Movement";
        }

        return {
            season: seasonId,
            weather: currentCell.label,
            severity: currentCell.severity,
            roll,
            rollType
        };
    });
}

export function getSeasonFlower(seasonId) {
    return getSeason(seasonId);
}

function getSeason(seasonId) {
    const season = seasonsById.get(seasonId);
    if (season === undefined) {
        throw new RangeError(`Unknown weather season: ${seasonId}`);
    }
    return season;
}

function getStartingCell(season, rng) {
    const roll = roll2d6(rng);
    const cell = season.cells.find(candidate => candidate.startRoll === roll);
    if (cell === undefined) {
        throw new Error(`No ${season.label.toLowerCase()} starting hex is mapped to a roll of ${roll}.`);
    }
    return { roll, cell };
}

function roll2d6(rng) {
    return Math.floor(rng() * 6) + Math.floor(rng() * 6) + 2;
}

function moveToWeather(season, currentCell, roll) {
    const direction = movementDirections.get(roll);
    if (direction === undefined) {
        if (roll === 9 || roll === 10) {
            return currentCell;
        }
        throw new RangeError(`Invalid weather movement roll: ${roll}`);
    }

    const [qOffset, rOffset] = WEATHER_DIRECTIONS[direction];
    const nextCell = season.cells.find(cell =>
        cell.q === currentCell.q + qOffset && cell.r === currentCell.r + rOffset
    );
    if (nextCell !== undefined) {
        return nextCell;
    }

    if (season.blockedEdges.some(edge =>
        edge.q === currentCell.q && edge.r === currentCell.r && edge.direction === direction
    )) {
        return currentCell;
    }

    let wrappedCell = currentCell;
    let previousCell;
    while ((previousCell = season.cells.find(cell =>
        cell.q === wrappedCell.q - qOffset && cell.r === wrappedCell.r - rOffset
    )) !== undefined) {
        wrappedCell = previousCell;
    }
    return wrappedCell;
}
