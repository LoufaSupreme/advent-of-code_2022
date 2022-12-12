const fs = require('fs');
const { off } = require('process');

const input = fs.readFileSync('input.txt').toString();
// const input = fs.readFileSync('sample.txt').toString();

function parseInput(input) {
    return input
        .split('\n\n')
        .map(monkey => {
            const items = /\ *Starting items: (.*)/
                .exec(monkey)[1]
                .split(', ')
                .map(Number);

            const op = /  Operation: (.*)/g.exec(monkey)[1].replace('new', 'newWorry');

            const divisibleBy = +/  Test: divisible by (\d+)/g.exec(monkey)[1];

            const ifTrue = +/    If true: throw to monkey (\d+)/g.exec(monkey)[1];

            const ifFalse = +/    If false: throw to monkey (\d+)/g.exec(monkey)[1];

            const inspected = 0;
            
            return { items, op, divisibleBy, ifTrue, ifFalse, inspected }
        })
}

// function passItem(item, fromMonkey, toMonkey) {
//     const itemIdx = fromMonkey.items.indexOf(item);
//     if (itemIdx < 0) throw new Error('Lost Item!');
//     fromMonkey.items.splice(itemIdx, 1);
//     toMonkey.items.push(item);
//     console.log(`Passing ${item}`)
//     console.log(fromMonkey)
//     console.log(toMonkey)
// }

function handleOneMonkey(monkey) {
    monkey.items.reverse();
    for (let i = monkey.items.length - 1; i >= 0; i--) {
        const old = monkey.items[i];
        let newWorry;
        eval(monkey.op);
        // console.log(`Ran ${monkey.op}. Item: ${monkey.items[i]}, worry: ${newWorry}`)

        newWorry = Math.floor(newWorry / 3);

        if (newWorry % monkey.divisibleBy === 0) {
            monkeys[monkey.ifTrue].items.push(newWorry);
        }
        else {
            monkeys[monkey.ifFalse].items.push(newWorry);
        }

        monkey.items.pop();
        monkey.inspected += 1;
    };
}

const monkeys = parseInput(input);

function main() {
    const ROUNDS = 20;
    for (let i = 0; i < ROUNDS; i++) {
        for (const monkey of monkeys) {
            handleOneMonkey(monkey);
        }
    }

    const monkeyBusiness = monkeys
        .sort((a, b) => {
            return a.inspected > b.inspected ? -1 : 1;
        }).reduce((acc, curr, idx) => {
            if (idx < 2) acc *= curr.inspected;
            return acc;
        },1);
    console.log(monkeyBusiness);
}


// console.log(parseInput(input))
// handleOneMonkey(monkeys[0])
main();

