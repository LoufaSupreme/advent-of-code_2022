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
    let noOverlap = 0;
    // [14,67],[4,13]
    for (const pair of pairs) {
        if (
            (pair[0][0] > pair[1][1] || 
            pair[0][1] < pair[1][0])
        ) {
            // console.log(`${pair[0]} / ${pair[1]}: TRUE`)
        }
        else {
            // console.log(`${pair[0]} / ${pair[1]}: FALSE`)
            noOverlap++
        }
    }
    return noOverlap;
}

console.log(result(input));