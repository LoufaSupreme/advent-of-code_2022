const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

// const input = `\
// R 10
// U 10
// L 10
// D 10
// U 10
// R 10\
// `

const moves = input
    .split('\n')
    .map(line => {
        line = line.split(' ');
        line[1] = parseInt(line[1]);
        return line;
    });

const visited = ['0-0']
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
        // console.log(`Head: ${headPos.x},${headPos.y}`)

        moveTail(tailPos, headPos, dx, dy);
    }
}

function moveTail(currTailPos, currHeadPos, dx, dy) {
    
    const displacement = (currHeadPos.x - currTailPos.x) ** 2 + (currHeadPos.y - currTailPos.y) ** 2;

    if (displacement <= 2) return;

    else if (displacement == 4) {
        tailPos.x += dx;
        tailPos.y += dy;
    }

    else {
        const x_dir = currHeadPos.x - currTailPos.x > 0 ? 1 : -1;
        const y_dir = currHeadPos.y - currTailPos.y > 0 ? 1 : -1;
        tailPos.x += x_dir;
        tailPos.y += y_dir;
    }
    // console.log(displacement)
    // console.log(`Tail: ${tailPos.x},${tailPos.y}`)

    if (!visited.includes(`${tailPos.x},${tailPos.y}`)) visited.push(`${tailPos.x},${tailPos.y}`);
}

function main() {
    for (const move of moves) {
        moveHead(headPos, move);
    }
    // moveHead(headPos, ['U', 2])
    // moveHead(headPos, ['D', 2])
    // moveHead(headPos, ['R', 2])
    // moveHead(headPos, ['U', 2])
    console.log(visited.length)
    return visited;
}

// console.log(main())
main()
