const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
// const input = fs.readFileSync('sample.txt').toString();

const key = {
    noop: {
        cycles: 1,
        op: null
    },
    addx: {
        cycles: 2,
        op: (V) => V
    }
}

// function addx(X, V) {
//     console.log(`adding ${V} to ${X}`)
//     return X += V;
// }

function parseInput(input) {
    return input
        .split('\n')
        .map(line => {
            line = line.split(' ');
            if (line.length > 1) line[1] = parseInt(line[1]);
            return line;
        })
}

function isSignalInterval(cycles, X) {
    if ((cycles - 20) % 40 === 0) {
        console.log(`Cycles: ${cycles}, X: ${X}, Tot: ${cycles*X}`)
        return true;
    }
    return false;
}

function main() {
    let cycles = 0;
    let X = 1;
    const signalStrengths = [];
    const instructions = parseInput(input);

    for (const [instruction, V] of instructions) {
        for (let i = 0; i < key[instruction].cycles; i++) {
            cycles += 1;
            if (isSignalInterval(cycles, X)) {
                signalStrengths.push(cycles * X)
            }
        }
        if (key[instruction].op) {
            // console.log(`Adding ${V} to ${X} on cycle ${cycles}`)
            X += key[instruction]['op'](V);
        }
    }
    const totalSignalStrength = signalStrengths.reduce((acc, curr) => {
        return acc += curr;
    },0)
    console.log(totalSignalStrength)
}

main();