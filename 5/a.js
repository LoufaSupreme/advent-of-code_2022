/*
        [G]         [D]     [Q]    
[P]     [T]         [L] [M] [Z]    
[Z] [Z] [C]         [Z] [G] [W]    
[M] [B] [F]         [P] [C] [H] [N]
[T] [S] [R]     [H] [W] [R] [L] [W]
[R] [T] [Q] [Z] [R] [S] [Z] [F] [P]
[C] [N] [H] [R] [N] [H] [D] [J] [Q]
[N] [D] [M] [G] [Z] [F] [W] [S] [S]
 1   2   3   4   5   6   7   8   9 
*/

const fs = require('fs');

const stacks = [
    'NCRTMZP',
    'DNTSBZ',
    'MHQRFCTG',
    'GRZ',
    'ZNRH',
    'FHSWPZLD',
    'WDZRCGM',
    'SJFLHWZQ',
    'SQPWN',
].map(crate => crate.split(''));

const moves = fs.readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(move => {
        const regex = /\w+\s(\d*)\s\w+\s(\d*)\s\w+\s(\d*)/gi;
        return regex.exec(move).splice(1).map(digit => parseInt(digit));
    })

function moveCrates() {
    for (const move of moves) {
        const [amount, fromStack, toStack] = move;
        
        for (let i = 0; i < amount; i++) {
            const crate = stacks[fromStack-1].pop();
            stacks[toStack-1].push(crate);
            // console.log(`Moving [${crate}] from ${stacks[fromStack-1]} to ${stacks[toStack-1]}`)
        }
    }
}

function findTopCrates() {
    moveCrates();

    const tops = stacks.reduce((acc, curr) => {
        return acc += curr.slice(-1)
    },"")
    return tops;
}

console.log(findTopCrates())
