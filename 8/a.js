const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

// const input = `\
// 30373
// 25512
// 65332
// 33549
// 35390\
// `

function makeGrid(input) {
    return input
        .split('\n')
        .map(sequence => {
            sequence = sequence.split('');
            return sequence.map(num => parseInt(num));
        });
}

// returns true if tree at y, x is visible from the direction of dy, dx
function checkLine(grid, y, x, dy, dx) {
    let currX = x + dx;
    let currY = y + dy;
    while (
        currX >= 0 && 
        currX < grid[0].length &&
        currY >= 0 &&
        currY < grid.length
        ) {
        // console.log(currY, currX, grid[currY][currX])
        if (grid[currY][currX] >= grid[y][x]) return false;
        currX += dx;
        currY += dy;
    } 
    return true;
}

function checkGrid(grid) {
    const visible = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            // up
            if (checkLine(grid, row, col, -1, 0)) {
                visible.push([row, col])
                continue;
            }
            // down
            if (checkLine(grid, row, col, 1, 0)) {
                visible.push([row, col])
                continue;
            }
            // left
            if (checkLine(grid, row, col, 0, -1)) {
                visible.push([row, col])
                continue;
            }
            // right
            if (checkLine(grid, row, col, 0, 1)) {
                visible.push([row, col])
                continue;
            }
        }
    }
    return visible;
}

const grid = makeGrid(input);
console.log(checkGrid(grid).length);
