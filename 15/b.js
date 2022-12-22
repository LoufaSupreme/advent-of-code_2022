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
    const intervals = [];
    for (const sensor of map) {
        if (Math.abs(sensor.sensor_y - row) <= sensor.dist) {
            // console.log(sensor, sensor.dist - Math.abs(row - sensor.sensor_y))
            const x_range = sensor.dist - Math.abs(row - sensor.sensor_y);
            intervals.push([sensor.sensor_x - x_range, sensor.sensor_x + x_range])
        }
    }
    return intervals;
}

function combineIntervals(intervals) {
    intervals.sort((a,b) => a[0] - b[0]);
    const result = [[intervals[0][0], intervals[0][1]]];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= result[result.length-1][1] + 1) {
            result[result.length-1][1] = Math.max(result[result.length-1][1], intervals[i][1]);
        }
        else {
            result.push(intervals[i]);
        }
    }
    return result;
}



function main() {
    const map = parseInput(input);
    // console.log(map)
    const maxRow = 4000000;
    for (let row = 0; row < maxRow; row++) {
        const intervals = exploreRow(row, map);
        const combined = combineIntervals(intervals);
        if (combined.length > 1) {
            console.log(`${(combined[0][1]+1) * 4000000 + row}`)
        }
    }
    // console.log(combined)
}

// console.log(parseInput(input))
// console.log(manhattenDist({x:8,y:7}, {x:2,y:10}))
// console.log(checkDistance({x:13,y:-2}, { sensor_x: 13, sensor_y: 2, beacon_x: 15, beacon_y: 3, dist: 3 },))
// console.log(isSensorOrBeacon({x:15, y:3}, map))
main()