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
        return {x, y, type: 'wall'};
    });
}

function hitWall(map, target) {
    return map.find(point => point.x === target.x && point.y === target.y);
}


function drawMap(map) {
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
            
            if (row === grid.length - 1) grid[row][col] = '_';
            if (col === 0 || col === grid[0].length - 1) grid[row][col] = '|';

            const onMap = hitWall(map, {x: col + minX - mapPadding, y: row + minY - mapPadding});
            if (onMap) {
                if (onMap.type === 'wall') grid[row][col] = '🧱';
                else if (onMap.type === 'sand') grid[row][col] = 'o';
                else if (onMap.type === 'Sand Origin') grid[row][col] = "+"
            }
        }
    }

    const drawnMap = grid.map(line => line.join('')).join('\n');
    fs.writeFileSync('map.txt', drawnMap);
    return maxY;
}

function isBlocked(map, pos) {
    // console.log(map)
    if (!hitWall(map, pos)) return false;
    else if (hitWall(map, {x: pos.x - 1, y: pos.y}) && hitWall({x: pos.x + 1, y: pos.y})) return true;
    return false;
}

function isOnMap(lowestPoint, pos) {
    return pos.y <= lowestPoint;
}

function createSandParticle(map, sandOrigin, lowestPoint) {
    const sand = {
        x: sandOrigin.x,
        y: sandOrigin.y,
        type: 'sand',
        atRest: false
    };

    while (!sand.atRest) {
        if (!isOnMap(lowestPoint, sand)) return;
        // if we can move down w/o hitting a wall, continue
        if (!hitWall(map, {x: sand.x, y: sand.y+1})) sand.y += 1;
        // if we'll hit a wall on the next move:
        else {
            // check if we can go left
            if (!hitWall(map, {x: sand.x-1, y: sand.y+1})) {
                sand.x -= 1;
                sand.y += 1;
            }
            // check if we can go right
            else if (!hitWall(map, {x: sand.x+1, y: sand.y+1})) {
                sand.x += 1;
                sand.y += 1;
            }
            // if we can't go anywhere then the sand stops
            else {
                sand.atRest = true;
                return sand;
            }
        }
    }
}

function main() {
    const sandOrigin = {
        x: 500,
        y: 0, 
        type: 'Sand Origin'
    }
    const points = parseInput(input);
    let map = [...populateMap(points), sandOrigin];
    // console.log(map)
    const lowestPoint = drawMap(map);

    let complete = false;
    let sandParticles = 0;
    while (!complete) {
    // for (let i = 0; i < 25; i++) {
        const sand = createSandParticle(map, sandOrigin, lowestPoint);
        if (sand) {
            map = [...map, sand];
            sandParticles++;
            // console.log(sand)
            // console.log(map)
        }
        else {
            complete = true;
        }
    }
    console.log(sandParticles)
    drawMap(map);
}

// console.log(parseInput(input));
main();

