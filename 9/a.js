const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

// const input = `\
// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2\
// `

const moves = input
    .split('\n')
    .map(line => {
        line = line.split(' ');
        line[1] = parseInt(line[1]);
        return line;
    });

const visited = ['0,0']
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

        moveTail(tailPos, headPos);
    }
}

function moveTail(currTailPos, currHeadPos) {
    
    const displacement = (currHeadPos.x - currTailPos.x) ** 2 + (currHeadPos.y - currTailPos.y) ** 2;

    if (displacement <= 2) return;

    else {
        let dx = 0;
        let dy = 0;
        if (currHeadPos.x - currTailPos.x > 0) dx = 1;
        else if (currHeadPos.x - currTailPos.x < 0) dx = -1;
        if (currHeadPos.y - currTailPos.y > 0) dy = 1;
        else if (currHeadPos.y - currTailPos.y < 0) dy = -1;

        tailPos.x += dx;
        tailPos.y += dy;

        if (!visited.includes(`${tailPos.x},${tailPos.y}`)) visited.push(`${tailPos.x},${tailPos.y}`);
    }

    // console.log(`Tail: ${tailPos.x},${tailPos.y}`)

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
