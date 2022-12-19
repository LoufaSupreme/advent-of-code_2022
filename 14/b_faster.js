const fs = require('fs');

// MUCH FASTER VERSION - USING A SET INSTEAD OF 2D ARRAY

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
    let maxY = -Infinity;
    for (const line of lines) {
        while (line.length > 1) {
            let point = line.pop();
            if (point.y > maxY) maxY = point.y;
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

    return {map, maxY};
}

function sandAtTop(map, target) {
    return map.has(target)
}

function hitWall(map, floor, target) {
    if (map.has(`${target.x}, ${target.y}`)) {
        // console.log('on map')
        return true
    } 
    if (target.y >= floor) {
        // console.log('hit floor')
        return true
    }
    return false;
}

function createSandParticle(map, sandOrigin, floor) {
    const sand = {
        x: sandOrigin.x,
        y: sandOrigin.y,
    };

    while (true) {
        if (sandAtTop(map, `${sandOrigin.x}, ${sandOrigin.y}`)) return;
        // if we can move down w/o hitting a wall, continue
        if (!hitWall(map, floor, {x: sand.x, y: sand.y+1})) sand.y += 1;
        // if we'll hit a wall on the next move:
        else {
            // check if we can go left
            if (!hitWall(map, floor, {x: sand.x-1, y: sand.y+1})) {
                sand.x -= 1;
                sand.y += 1;
            }
            // check if we can go right
            else if (!hitWall(map, floor, {x: sand.x+1, y: sand.y+1})) {
                sand.x += 1;
                sand.y += 1;
            }
            // if we can't go anywhere then the sand stops
            else {
                return `${sand.x}, ${sand.y}`;
            }
        }
    }
}

function main() {
    const sandOrigin = {
        x: 500,
        y: 0, 
    }
    const points = parseInput(input);
    let {map, maxY} = populateMap(points);
    const floor = maxY + 2;

    let complete = false;
    let sandParticles = 0;

    while (!complete) {
    // for (let i = 0; i < 25; i++) {
        const sand = createSandParticle(map, sandOrigin, floor);
        if (sand) {
            map.add(sand);
            sandParticles++;
            // console.log(sand)
            // console.log(map)
        }
        else {
            complete = true;
        }
    }
    console.log(sandParticles);
    // mapBoundaries = findMapBoundaries(map);
    // drawMap(map, mapBoundaries, floor);
}

// console.log(parseInput(input));
main();

