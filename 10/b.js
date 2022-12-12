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
    if ((cycles) % 40 === 0) {
        // console.log(`Cycles: ${cycles}, X: ${X}, Tot: ${cycles*X}`)
        return true;
    }
    return false;
}

function main() {
    let cycles = 0;
    let X = 1;
    const instructions = parseInput(input);
    let printOut = "";

    for (const [instruction, V] of instructions) {
        for (let i = 0; i < key[instruction].cycles; i++) {
            cycles += 1;
            // it's this way bc of the indexing of the positions
            if (X <= cycles%40 && cycles%40 <= X+2) {
                printOut += '#';
            }
            else printOut += ' ';
            if (isSignalInterval(cycles, X)) {
                printOut += '\n';
            }
            console.log(`Cycle: ${cycles}, X: ${X}`)
        }
        if (key[instruction].op) {
            // console.log(`Adding ${V} to ${X} on cycle ${cycles}`)
            X += key[instruction]['op'](V);
        }
    }
    console.log(printOut)
}

main();