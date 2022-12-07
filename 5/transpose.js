// how to transpose an input

const fs = require('fs');

// const rawStacks = `\
//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3`.split("\n").slice(0,-1)

// get raw data and split into an array of strings for each row
// take off the last line in this case b/c we don't need the stack labels
const rawStacks = fs.readFileSync('transpose.txt')
    .toString()
    .split("\n")
    .slice(0,-1);

// remove whitespace and [] characters to get only the letters
// letters are in index, 1, 5, 9, etc.  All remainder 1 if divided by 4
const stackRows = rawStacks.map(row => {
    let line = "";
    for (let i = 0; i < row.length; i++) {
        line += i % 4 === 1 ? row[i] : ""
    }
    return line;
})

// determine how many final stacks there will be
// there will be a stack for every character of a row
const numStacks = stackRows[0].length;

// initialize an array full of empty strings for each final stack
const stacks = Array(numStacks).fill("");

// go through every character of every row
// if the character is not blank, then we need to add it to the final stack
// we will prepend the character (rather than append) to get the final stacks in bottom-to-top order
// the final stacks position is the same as the current characters position (j) since we're transposing
for (let i = 0; i < stackRows.length; i++) {
    for (let j = 0; j < stackRows[i].length; j++) {
        if (stackRows[i][j] !== " ") stacks[j] = stackRows[i][j] + stacks[j]
    }
}

console.log(stacks);