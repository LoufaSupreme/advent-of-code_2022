const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

// const input = `\
// R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20\
// `

const moves = input
    .split('\n')
    .map(line => {
        line = line.split(' ');
        line[1] = parseInt(line[1]);
        return line;
    });

// const points = Array(9).fill({x: 0, y: 0});
const points = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
]

const visited = ['0,0'];

function moveHead(head, [direction, amount]) {
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
        head.x += dx;
        head.y += dy;

        updatePoints();
        // console.log(`Head: ${headPos.x},${headPos.y}`)

    }
}

function updatePoints() {
    for (let i = 1; i < points.length; i++) {
        followPoint(i, i-1);
        if (i === points.length-1) {
            if (!visited.includes(`${points[i].x},${points[i].y}`)) visited.push(`${points[i].x},${points[i].y}`);
        }

        // console.log(`Point${i}: ${points[i].x},${points[i].y}`)
    }
}

function followPoint(pointIndex, targetPointIdx) {
    // console.log(`Updating Pt${pointIndex}: ${points[pointIndex].x},${points[pointIndex].y} compared to Pt${targetPointIdx}: ${points[targetPointIdx].x},${points[targetPointIdx].y}`)
    
    const displacement = (points[targetPointIdx].x - points[pointIndex].x) ** 2 + (points[targetPointIdx].y - points[pointIndex].y) ** 2;

    if (displacement <= 2) return;

    else {
        let dx = 0;
        let dy = 0;
        if (points[targetPointIdx].x - points[pointIndex].x > 0) dx = 1;
        else if (points[targetPointIdx].x - points[pointIndex].x < 0) dx = -1;
        if (points[targetPointIdx].y - points[pointIndex].y > 0) dy = 1;
        else if (points[targetPointIdx].y - points[pointIndex].y < 0) dy = -1;

        points[pointIndex].x += dx,
        points[pointIndex].y += dy
    }

    // console.log(`Tail: ${tailPos.x},${tailPos.y}`)

}

function main() {
    for (const move of moves) {
        moveHead(points[0], move);
    }
    console.log(visited.length)
    return visited;
}

// console.log(main())
main()
