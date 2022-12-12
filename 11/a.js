const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

// const input = ``

function parseInput(input) {
    return input
        .split('\n\n')
        .map(monkey => {
            const items = /\ *Starting items: (.*)/
                .exec(monkey)[1]
                .split(', ')
                .map(Number);

            const [op, val] = /  Operation: new = old (.) (.+)/g.exec(monkey).slice(1, 3);

            const divisibleBy = +/  Test: divisible by (\d+)/g.exec(monkey)[1];

            const ifTrue = +/    If true: throw to monkey (\d+)/g.exec(monkey)[1];

            const ifFalse = +/    If false: throw to monkey (\d+)/g.exec(monkey)[1];
            
            return { items, op, val, divisibleBy, ifTrue, ifFalse }
        })
}

console.log(parseInput(input))