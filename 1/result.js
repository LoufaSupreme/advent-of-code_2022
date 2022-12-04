const fs = require('fs');

const rawInput = fs.readFileSync('input.txt').toString();

const inputArr = rawInput.split("\n\n").map(elem => elem.split("\n"))

const elves = inputArr.map((elf, idx) => {
    const totCalories = elf.reduce((acc, curr) => {
        return acc += +curr;
    },0);
    return {
        totCalories,
        idx,
        pack: elf
    }
}).sort((a, b) => {
    return a.totCalories < b.totCalories ? 1 : -1;
});

let top3Combined = 0;
for (let i = 0; i < 3; i++) {
    top3Combined += elves[i].totCalories;
}

console.log(elves[0]);
console.log(top3Combined);