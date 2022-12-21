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

function exploreRow(row, map) {
    const scanned = new Set();
    for (const sensor of map) {
        if (Math.abs(sensor.sensor_y - row) <= sensor.dist) {
            const x_range = sensor.dist - Math.abs(row - sensor.sensor_y);
            for (let i = -x_range; i < x_range + 1; i++) {
                if (sensor.beacon_y === row && sensor.beacon_x === sensor.sensor_x + i) {
                    // console.log(sensor, sensor.sensor_x + i)
                }
                else scanned.add(`${sensor.sensor_x + i},${row}`);
            }
        }
    }
    return scanned;
}



function main() {
    const map = parseInput(input);
    // console.log(map)
    const targetRow = 2000000;
    const scanned = exploreRow(targetRow, map);
    console.log(scanned.size)
}

// console.log(parseInput(input))
// console.log(manhattenDist({x:8,y:7}, {x:2,y:10}))
// console.log(checkDistance({x:13,y:-2}, { sensor_x: 13, sensor_y: 2, beacon_x: 15, beacon_y: 3, dist: 3 },))
// console.log(isSensorOrBeacon({x:15, y:3}, map))
main()