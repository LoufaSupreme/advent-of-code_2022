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
        code: 'lose',
        points: 0,
    },
    Y: {
        code: 'draw',
        points: 3,
    },
    Z: {
        code: 'win',
        points: 6,
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
    const [rivalPlay, decision] = play;
    if (decision.code === 'win') {
        const winningPlay = Object.values(plays).filter(play => {
            return play.beats === rivalPlay.code
        })[0];
        return 6 + winningPlay.points;
    }
    else if (decision.code === 'lose') {
        const losingPlay = Object.values(plays).filter(play => {
            return play.code === rivalPlay.beats
        })[0];
        return 0 + losingPlay.points;
    }
    else return 3 + rivalPlay.points;
}

const cumScore = input.reduce((acc, curr) => {
    return acc += computeResults(curr);
},0)

console.log(cumScore);