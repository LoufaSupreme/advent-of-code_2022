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
    let scenicScore = 0;
    while (
        currX >= 0 && 
        currX < grid[0].length &&
        currY >= 0 &&
        currY < grid.length
        ) {
            // console.log(currY, currX, grid[currY][currX])
            if (grid[currY][currX] >= grid[y][x]) return scenicScore + 1;
            scenicScore += 1;
            currX += dx;
            currY += dy;
        } 
    return scenicScore;
}

function checkGrid(grid) {
    let maxScenicScore = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const upScore = checkLine(grid, row, col, -1, 0)
            const downScore = checkLine(grid, row, col, 1, 0)
            const leftScore = checkLine(grid, row, col, 0, -1)
            const rightScore = checkLine(grid, row, col, 0, 1)

            const scenicScore = upScore * downScore * leftScore * rightScore;

            if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;
        }
    }
    return maxScenicScore;
}

const grid = makeGrid(input);
console.log(checkGrid(grid));
