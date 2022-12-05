const fs = require('fs');
const rawInput = fs.readFileSync('input.txt').toString();

const input = rawInput
    .split("\n")
    .map(rucksack => {
        const compartmentA = rucksack.split('');
        const compartmentB = compartmentA.splice(compartmentA.length / 2);
        return {
            compartmentA: compartmentA,
            compartmentB: compartmentB
        }
    })
    .map(rucksack => {
        for (const [compartment, items] of Object.entries(rucksack)) {
            rucksack[compartment] = items.map(item => {
                return { 
                    letter: item,
                    priority: calculatePriority(item),
                    duplicate: returnDuplicate(rucksack)
                }    
            })
        }
        return rucksack;
    });

const testInput = rawInput
    .split("\n").splice(0, 2)
    .map(rucksack => {
        const compartmentA = rucksack.split('');
        const compartmentB = compartmentA.splice(compartmentA.length / 2);
        return {
            compartmentA: compartmentA,
            compartmentB: compartmentB
        }
    })
    .map(rucksack => {
        for (const [compartment, items] of Object.entries(rucksack)) {
            rucksack[compartment] = items.map(item => {
                return { 
                    letter: item,
                    priority: calculatePriority(item),
                    duplicate: returnDuplicate(rucksack)
                }    
            })
        }
        return rucksack;
    });
        
function returnDuplicate(rucksack) {
    let duplicate = {};

    rucksack.compartmentA.forEach(A_item => {
        if (rucksack.compartmentB.filter(B_item => B_item.letter === A_item.letter).length > 0) {
            duplicate = A_item;
        }
    })

    return duplicate
}

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

function calculateSum(rucksacks) {
    let grandTotal = 0;
    for (const rucksack of rucksacks) {
        grandTotal += returnDuplicate(rucksack).priority;
    }
    return grandTotal;
}

console.log(calculateSum(input))

// console.log(testInput)
// console.log(returnDuplicate(testInput[0]))
