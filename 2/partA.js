const fs = require('fs');

const plays = {
    A: {
        code: 'rock',
        points: 1,
        beats: 'scissors'
    },
    B: {
        code: 'paper',
        points: 2,
        beats: 'rock'
    },
    C: {
        code: 'scissors',
        points: 3,
        beats: 'paper'
    },
    X: {
        code: 'rock',
        points: 1,
        beats: 'scissors'
    },
    Y: {
        code: 'paper',
        points: 2,
        beats: 'rock'
    },
    Z: {
        code: 'scissors',
        points: 3,
        beats: 'paper'
    },
}

const rawInput = fs.readFileSync('input.txt').toString();
const input = rawInput
    .split("\n")
    .map(elem => {
        elem = elem.split(' ');
        elem[0] = plays[elem[0]];
        elem[1] = plays[elem[1]];
        return elem;
    });


function computeResults(play) {
    const [rival, me] = play;
    if (me.beats === rival.code) {
        return 6 + me.points;
    }
    else if (me.code === rival.code) {
        return 3 + me.points;
    }
    else return 0 + me.points;
}

const cumScore = input.reduce((acc, curr) => {
    return acc += computeResults(curr);
},0)

console.log(cumScore);