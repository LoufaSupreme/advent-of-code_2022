const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
// const input = `\
// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi\
// `;

function parseInput(input) {
    return input
        .split('\n')
        .map(line => line.split(''))
}

function isEnd(pos, grid) {
    if (grid[pos.y][pos.x] === 'a') return true;
    return false;
}

function isOnGrid(pos, grid) {
    if (pos.y >= 0 && pos.y < grid.length && pos.x >= 0 && pos.x < grid[0].length) return true;
    return false;
}

function isValidElevation(src, dest) {
    if (src === 'E') src = 'z';
    if (dest === 'S') dest = 'a';
    if ( (dest.charCodeAt() - src.charCodeAt()) >= -1 ) return true;
    return false;
}

function calculateValidMoves(pos, grid) {
    const validMoves = [];
    const directions = [
        {dx: 0, dy: 1},
        {dx: 0, dy: -1},
        {dx: 1, dy: 0},
        {dx: -1, dy: 0},
    ]
    for (const direction of directions) {
        const newPoint = { x: pos.x + direction.dx, y: pos.y + direction.dy};
        if ( !isOnGrid(newPoint, grid) ) continue;
        if ( isValidElevation(grid[pos.y][pos.x], grid[newPoint.y][newPoint.x]) ) {
            validMoves.push(newPoint);
        }
    }
    return validMoves;
}

function findEnd(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 'E') {
                return {
                    x: col,
                    y: row
                }
            }
        }
    }
}

function displayPath(grid, paths) {
    let board = [...grid];
    // let board = [...grid].map(row => row.map(l => ` `));
    for (let i = 0; i < paths.length - 1; i++) {
        const l = grid[paths[i].y][paths[i].x];
        if (paths[i].x < paths[i+1].x) {
            board[paths[i].y][paths[i].x] = `>`;
            // board[paths[i].y][paths[i].x] = `>(${l})`;
        }
        else if (paths[i].x > paths[i+1].x) {
            board[paths[i].y][paths[i].x] = `<`;
            // board[paths[i].y][paths[i].x] = `<(${l})`;
        }
        else if (paths[i].y < paths[i+1].y) {
            board[paths[i].y][paths[i].x] = `v`;
            // board[paths[i].y][paths[i].x] = `v(${l})`;
        }
        else if (paths[i].y > paths[i+1].y) {
            board[paths[i].y][paths[i].x] = `^`;
            // board[paths[i].y][paths[i].x] = `^(${l})`;
        }
        else {
            throw new Error('FUCK SHIT')
        }
    }
    board = board.map(row => row.join('')).join('\n')
    fs.writeFileSync('result2.txt', board);
}

function main() {
    const grid = parseInput(input);
    const start = findEnd(grid);
    // #steps, current pos
    const q = [[ 0, start, [] ]];
    const visited = new Set();
    
    while (q.length) {
        const [steps, pos, path] = q.shift();
        visited.add(`x: ${pos.x}, y: ${pos.y}`);
        if (isEnd(pos, grid)) {
            displayPath(grid, [...path, pos]);
            return [steps, pos];
        }

        const moves = calculateValidMoves(pos, grid);
        for (const move of moves) {
            const str = `x: ${move.x}, y: ${move.y}`
            if (!visited.has(str)) {
                q.push([steps+1, move, [...path, pos]]);
                visited.add(str)
            }
        }
    }
}

// const grid = parseInput(input);
// console.log(isValidElevation('a', 'c'))
// console.log(grid.map(row => row.join("")).join('\n'))
console.log(main())
// console.log(findStart(grid))
