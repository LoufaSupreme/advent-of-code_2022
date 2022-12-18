const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
// const input = fs.readFileSync('sample.txt').toString();


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

function drawMap(map, sandOrigin) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const pt of map) {
        if (pt.x < minX) minX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y > maxY) maxY = pt.y;
    }

    const mapPadding = 2;

    const grid = Array(maxY-minY+1+mapPadding*2).fill(0).map(elem => Array(maxX-minX+1+mapPadding*2).fill(' '));
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            isVal = map.find(elem => {
                return elem.x === col + minX - mapPadding && elem.y === row + minY - mapPadding;
            });
            if (row === grid.length - 1) grid[row][col] = '_';
            if (col === 0 || col === grid[0].length - 1) grid[row][col] = '|'
            if (isVal) {
                grid[row][col] = '🧱';
            }
            if (sandOrigin.x === col+minX-mapPadding && sandOrigin.y === row+minY-mapPadding) {
                grid[row][col] = "+"
            }
        }
    }

    const drawnMap = grid.map(line => line.join('')).join('\n');
    fs.writeFileSync('map.txt', drawnMap);
}

function main() {
    const sandOrigin = {
        x: 500,
        y: 0
    }
    const points = parseInput(input);
    const map = [...populateMap(points), sandOrigin];
    // console.log(map)
    drawMap(map, sandOrigin)
}

// console.log(parseInput(input));
main();

