const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString();

const input = `\
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2\
`

const moves = input
    .split('\n')
    .map(line => {
        line = line.split(' ');
        line[1] = parseInt(line[1]);
        return line;
    });

const visited = new Set();
const headPos = {
    x: 0,
    y: 0
};
const tailPos = {
    x: 0,
    y: 0
};

function moveHead(currentPos, [direction, amount]) {
    let dx = 0, dy = 0;
    switch (direction) {
        case 'U':
          dy = -1;
          break;
        case 'R':
            dx = 1;
            break;
        case 'D':
          dy = 1;
          break;
        case 'L':
            dx = -1;
            break;
        default:
          throw new Error('Unknown direction');
    }
    for (let i = 0; i < amount; i++) {
        headPos.x = currentPos.x + dx;
        headPos.y = currentPos.y + dy;

        moveTail(tailPos, dx, dy);
    }
}

function moveTail(currTailPos, currHeadPos) {
    
    const displacement = (currHeadPos.x - currTailPos.x) ** 2 + (currHeadPos.y - currTailPos.y) ** 2;

    if (displacement <= 1) return;
    
    // diagonal
    else if (dx > 0 && dy > 0) return;
    else if (dx < 0 && dy < 0) return;
    else tailPos.x += dx



    if (currHeadPos.x - currTailPos.x > 1) tailPos.x += 1;
    else if (currHeadPos.x - currTailPos.y < -1) tailPos.x -= 1;
    if (currHeadPos.y - currTailPos.y > 1) tailPos.y += 1;
    else if (currHeadPos.y - currTailPos.y < -1) tailPos.y -= 1;

    console.log(`Moving Tail to ${tailPos.x},${tailPos.y}`)
    visited.add(`${tailPos.x},${tailPos.y}`);
}

function main() {
    for (const move of moves) {
        moveHead(headPos, move);
    }
    return visited;
}

console.log(main())