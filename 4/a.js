const fs = require('fs');

const rawInput = fs.readFileSync('input.txt').toString();

const input = rawInput
    .split('\n')
    .map(pair => {
        pair = pair.split(',');
        return pair.map(range => {
            range = range.split('-');
            return range = [+range[0], +range[1]];
        })
    })

function result(pairs) {
    let fullyEncapsulated = 0;
    for (const pair of pairs) {
        // console.log(
        //     (pair[0][0] <= pair[1][0] && 
        //     pair[0][1] >= pair[1][1]) ||
        //     (pair[1][0] <= pair[0][0] &&
        //     pair[1][1] >= pair[0][1])
        // )
        if (
            (pair[0][0] <= pair[1][0] && 
            pair[0][1] >= pair[1][1]) ||
            (pair[1][0] <= pair[0][0] &&
            pair[1][1] >= pair[0][1])
        ) {
            console.log(`${pair[0]} / ${pair[1]}: TRUE`)
            fullyEncapsulated++;
        }
        else {
            console.log(`${pair[0]} / ${pair[1]}: FALSE`)
        }
    }
    return fullyEncapsulated;
}

console.log(result(input));