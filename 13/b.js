const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
// const input = fs.readFileSync('sample.txt').toString();


function parseInput(input) {
    const arr = [];
    input
        .split('\n')
        .map(packet => {
            if (packet !== '') arr.push(parseStringifiedArrayEasyMode(packet))
        });
    return arr;
}

// recursive
// takes a stringified nested array: '[1,[2,[3,[4,[5,6,0]]]],8,9]'
// returns a nested array: [1,[2,[3,[4,[5,6,0]]]],8,9]
function parseStringifiedArray(str, arr = [], i = 0) {
    let digits = "";
    for (i; i < str.length; i++) {
        if (str[i] === ' ') continue;
        if (str[i].charCodeAt() >= 48 && str[i].charCodeAt() <= 57) {
            digits += str[i];
            // arr.push(+digits);
        }
        else if (str[i] === '[') {
            if (digits !== "") {
                arr.push(+digits);
                digits = ""
            }
            const newArr = []
            const res = parseStringifiedArray(str, newArr, i+1);
            arr.push(res.arr);
            i = res.idx;
        }
        else if (str[i] === ']') {
            if (digits !== "") {
                arr.push(+digits);
                digits = ""
            }
            return {arr: arr, idx: i};
        }
        else {
            if (digits !== "") {
                arr.push(+digits);
                digits = ""
            }
        }
    }
    return arr[0];
}

function parseStringifiedArrayEasyMode(strArr) {
    return JSON.parse(strArr);
}

function compareIntegers(left, right) {
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
}

function compare2(left, right) {
    if (typeof left === 'object' && typeof right === 'number') {
        right = [right];
    }

    if (typeof left === 'number' && typeof right === 'object') {
        left = [left];
    }
    
    // console.log('Comparing:')
    // console.log(left)
    // console.log(right)
    // console.log(('\n'))
    
    if (typeof left === 'number' && typeof right === 'number') {
        return compareIntegers(left, right);
    }

    if (typeof left === 'object' && typeof right === 'object') {
        
        // 2 empty arrays
        if (!left.length && !right.length) return 'equal'
        
        const biggestLength = Math.max(left.length, right.length);

        for (let i = 0; i < biggestLength; i++) {
            // console.log('...', left[i])
            // console.log('...', right[i])

            // we need to EXPLICITLY check for undefined!!!  Checking for !left[i] is not good enough, because a
            // value of 0 will resolve to 1.  This cost me hours of my life.
            if (left[i] === undefined) return -1;
            if (right[i] === undefined) return 1;

            const next = compare2(left[i], right[i]);
            if (next === 0) continue;
            else return next;
        }
        return 0;
    }
    throw new Error('Unexpected result')
}


function main() {
    const separatingPacket1 = [[2]];
    const separatingPacket2 = [[6]];
    const packets = [...parseInput(input),separatingPacket1,separatingPacket2];
    const sorted = packets.sort(compare2);   

    const idx1 = sorted.findIndex(elem => elem === separatingPacket1) + 1;
    const idx2 = sorted.findIndex(elem => elem === separatingPacket2) + 1;

    return idx1 * idx2;
}

console.log(main());
// console.log(parseInput(input))
