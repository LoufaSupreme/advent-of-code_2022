const fs = require('fs');
const rawInput = fs.readFileSync('input.txt').toString();

const input = rawInput
    .split("\n")
    .map(rucksack => {
        return rucksack.split('').map(item => {
            return { 
                letter: item,
                priority: calculatePriority(item),
            }    
        })
    })
    .reduce((group, rucksack, idx) => {
        const chunkIndex = Math.floor(idx/3);
        
        if(!group[chunkIndex]) group[chunkIndex] = [];
        group[chunkIndex].push(rucksack);
        return group;
    },[])


function calculatePriority(letter) {
    try {
        const charCode = letter.charCodeAt(0);
    
        if (letter.toLowerCase() === letter) {
            return charCode - 97 + 1;
        }
        return charCode - 65 + 27;
    }
    catch(err) {
        console.log(`Error w/ ${letter}: ${err}`)
    }
}

function returnDuplicate(group) {
    let duplicate = {};

    group[0].forEach(A_item => {
        if (
            group[1].filter(B_item => B_item.letter === A_item.letter).length > 0 && 
            group[2].filter(C_item => C_item.letter === A_item.letter).length > 0
        ) {
            duplicate = A_item;
        }
    })

    return duplicate
}

function calculateSum(groups) {
    let grandTotal = 0;
    for (const group of groups) {
        grandTotal += returnDuplicate(group).priority;
    }
    console.log(grandTotal);
    return grandTotal;
}

calculateSum(input)
// console.log(input)