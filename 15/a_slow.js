const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
// const input = fs.readFileSync('sample.txt').toString();

function parseInput(input) {
    return input
        .split('\n')
        .map(line => {
            const regex = /Sensor at x=(?<sensor_x>-?\d+), y=(?<sensor_y>-?\d+): closest beacon is at x=(?<beacon_x>-?\d+), y=(?<beacon_y>-?\d+)/;
            let {sensor_x, sensor_y, beacon_x, beacon_y} = line.match(regex).groups;
            [sensor_x, sensor_y, beacon_x, beacon_y] = [sensor_x, sensor_y, beacon_x, beacon_y].map(Number);
            const dist = manhattenDist({x:sensor_x, y:sensor_y}, {x:beacon_x, y:beacon_y});
            return {sensor_x, sensor_y, beacon_x, beacon_y, dist};
        })
}

function manhattenDist(posA, posB) {
    return Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
}

function withinRange(pos, target) {
    if (manhattenDist(pos, {x: target.sensor_x, y: target.sensor_y}) <= target.dist) return true;
    return false;
}

function isSensorOrBeacon(pos, map) {
    for (const location of map) {
        if (
            pos.x === location.sensor_x && pos.y === location.sensor_y || 
            pos.x === location.beacon_x && pos.y === location.beacon_y      
        ) return true;
    }
    return false;
}

function scannedLocations(map) {
    const scanned = new Set();
    const moves = [
        {dx: 0, dy: 1},
        {dx: 0, dy: -1},
        {dx: 1, dy: 0},
        {dx: -1, dy: 0},
        {dx: 1, dy: 1},
        {dx: 1, dy: -1},
        {dx: -1, dy: 1},
        {dx: -1, dy: -1},
    ]
    for (const pos of map) {
        const q = [{x: pos.sensor_x, y: pos.sensor_y, origin: pos}];
        while (q.length) {
            const curr = q.shift();
            scanned.add(`${curr.x},${curr.y}`)
            for (const move of moves) {
                const newPos = {x: curr.x + move.dx, y: curr.y + move.dy, origin: pos}
                if (!scanned.has(`${newPos.x},${newPos.y}`) && manhattenDist({x: curr.origin.sensor_x, y: curr.origin.sensor_y}, newPos) <= curr.origin.dist) {
                    q.push(newPos);
                    scanned.add(`${newPos.x},${newPos.y}`);
                }
            }

        }
    }
    return [...scanned].map(pt => {
        const [x,y] = pt.split(',').map(Number);
        return {x, y};
    })
}

function posInRow(row, positions) {
    return positions.filter(pos => {
        return pos.y === row;
    })
}

function main() {
    const map = parseInput(input);
    // console.log(map)
    const scanned = scannedLocations(map);
    // console.log(scanned);
    const targetRow = 2000000;
    const scannedInRow = posInRow(targetRow, scanned);
    const notBeacon = scannedInRow.filter(pos => {
        return !isSensorOrBeacon(pos, map);
    });
    console.log(notBeacon.length)

}

// console.log(parseInput(input))
// console.log(manhattenDist({x:8,y:7}, {x:2,y:10}))
// console.log(checkDistance({x:13,y:-2}, { sensor_x: 13, sensor_y: 2, beacon_x: 15, beacon_y: 3, dist: 3 },))
// console.log(isSensorOrBeacon({x:15, y:3}, map))
main()