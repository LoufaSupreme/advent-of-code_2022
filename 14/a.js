const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString();
const input = fs.readFileSync('sample.txt').toString();


function parseInput(input) {
    return input
        .split('\n')
        .map(line => {
            line = line.split(' -> ');
            return line.map(coord => {
                [x,y] = coord.split(',').map(Number);
                return {x, y};
            })
        });
}

function populateMap(lines) {
    const map = new Set();
    // const lines = [
    //     [{x: 498, y: 4},{x: 498, y: 6}, {x: 496, y: 6}],
    //     [{x: 1, y: 1},{x: 1, y: -5}, {x: -4, y: -5}]
    // ];
    for (const line of lines) {
        while (line.length > 1) {
            let point = line.pop();
            map.add(`${point.x}, ${point.y}`);
            while (point.x !== line[line.length - 1].x || point.y !== line[line.length - 1].y) {
                const deltaX = point.x - line[line.length-1].x;
                if (deltaX !== 0) point.x -= deltaX / Math.abs(deltaX);
                map.add(`${point.x}, ${point.y}`);
                const deltaY = point.y - line[line.length-1].y;
                if (deltaY !== 0) point.y -= deltaY / Math.abs(deltaY);
                map.add(`${point.x}, ${point.y}`);
            }
        }
    }

    return Array.from(map).map(pt => {
        [x,y] = pt.split(',').map(Number);
        return {x, y};
    });
}

// console.log(parseInput(input));
const points = parseInput(input);
console.log(populateMap(points));


