const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString();
const input = fs.readFileSync('input.txt').toString();
// const input = fs.readFileSync('sample.txt').toString();


function parseInput(input) {
    return input
        .split('\n\n')
        .map(pair => {
            pair = pair.split('\n');
            return pair.map(strArr => {
                return parseStringifiedArrayEasyMode(strArr)
            })
        });
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
    if (left < right) return true;
    if (left > right) return false;
    return 'equal';
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
            // value of 0 will resolve to false.  This cost me hours of my life.
            if (left[i] === undefined) return true;
            if (right[i] === undefined) return false;

            const next = compare2(left[i], right[i]);
            if (next === 'equal') continue;
            else return next;
        }
        return 'equal';
    }
    throw new Error('Unexpected result')
}


function main() {
    const pairs = parseInput(input);
    const correctIndexes = [];
    for (let i = 0; i < pairs.length; i++) {
        if (compare2(pairs[i][0], pairs[i][1]) === true) {
            correctIndexes.push(i+1);
        }
        else if (compare2(pairs[i][0], pairs[i][1]) === undefined) {
            console.log(`FUCKED PAIR: ${i}`)
            console.log(pairs[i].slice(0, 10))
        }
        else if (compare2(pairs[i][0], pairs[i][1]) === 'equal') {
            console.log(`BAD PAIR: ${i}`)
            console.log(pairs[i].slice(0, 10))
            // throw new Error('fuckkkkk')
        }
    }
    return correctIndexes.reduce((acc, curr) => {
        return acc + curr;
    },0);

    // return correctIndexes;
}

// console.log(parseInput(input))
// console.log(parseStringifiedArray('[1,[20,[300,[4000,[5,6,0]]]],8,910]'))
// console.log(parseStringifiedArray('[[[1]],[[2]]]'))
// console.log(parseStringifiedArray('[[310],[],[8],[]]'))
// console.log(compare2([1,1,1,1,1], [1,1,1,1,1])) // equal
// console.log(compare2([7,7,7,7], [7,7,7])) // false
// console.log(compare2([[2,[]],[],[[3,9,10],9]],[[[]]]))
// console.log(compare2( [[1],[2,3,4]], [[1],4] )) // true
// console.log(compare2( [[6,0]], [[4],[[[4,6],[4,10,3],2,[]],3]] ))
// console.log(compare2( [[[1]]], [[[2]]] ))
// console.log(compare2( [[4,4],4,4], [[4,4],4,4,4] )) // true
// console.log(compare2( [[],4], [[],3] )) // false
// console.log(compare2( [[5,4],4], [[[5,4]],4] )) // true
// console.log(compare2( [[],7], [[3]] )) // true
// console.log(compare2( [[1,1],2], [[1,1],1] )) // false
// console.log(compare2( [], [] )) // equal
// console.log(compare2( [], [3] )) // true
// console.log(compare2( [1], [] )) // false
// console.log(compare2( [[[]]], [[]] )) // false
// console.log(compare2( [[1],[2,3,4]], [[1],2,3,4] )) // false
// console.log(compare2( [4], [2,2,2] )) // 
// console.log(compare2( [1], [[1],1] )) // true 
// console.log(compare2( [[0,[[0],5,[6,3,3],[10,3,10,9]],4]], [[],[5],[8],[[[10,8,10,5,3],[3,7,10,9,8],0],[[],[]]]] )) // false
// console.log(compare2( [[5,[[3,0]],[0,[8,6,9],2,9],[5,6,[2,8,3],[0]],[6,2,[2,6,8],10]]], [[6,4,[2,[2,2],8,[3,7,0,6,2]]],[4,10]] )) // true 
// console.log(compare2( [1,[2,[3,[4,[5,6,7]]]],8,9], [1,[2,[3,[4,[5,6,0]]]],8,9] )) // false
// console.log(compare2( [[[[]]],[8,6],[[]],[],[[6,2,5]]], [[[2,10,[7,6,2]],[10,2],0,10],[[0,6],1,5,7],[10,[]]] ))
// console.log(compare2( [[],[7,1,[]],[9,3,9],[6],[0,4]], [[],[[[4,1,3],[10,9,8,7,9],7,[1,2],[8,0,2,5]],[6],6],[]] ))
// console.log(compare2( [[6,8],[[],[5,8,7,3,[]],2,[5,10,[0,5]]],[10,[3,7,[0,5,6,3],1,[9,4,5,1]],5],[[],[7,0,0],[7,6],[7,[7,3,1,1,1],0],[[],8,[]]]], [] )) // false
console.log(main());
// const pairs = parseInput(input);
// console.log(p)
