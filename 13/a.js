const { debug } = require('console');
const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString();
const input = `\
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]\
`;

function parseInput(input) {
    return input
        .split('\n\n')
        .map(pair => {
            pair = pair.split('\n');
            return pair.map(strArr => {
                strArr = strArr.slice(1).slice(0,-1);
                return parseStringifiedArray(strArr)
            })
        });
}

// recursive
// takes a stringified nested array w/o the beginnning parentheses: '1,[2,[3,[4,[5,6,0]]]],8,9'
// returns a nested array: [1,[2,[3,[4,[5,6,0]]]],8,9]
function parseStringifiedArray(str, arr = [], i = 0) {
    for (i; i < str.length; i++) {
        if (str[i] === ',' || str[i] === ' ') continue;
        else if (str[i] === '[') {
            const newArr = []
            const res = parseStringifiedArray(str, newArr, i+1);
            arr.push(res.arr);
            i = res.idx;
        }
        else if (str[i] === ']') {
            return {arr: arr, idx: i};
        }
        else {
            arr.push(+str[i]);
        }
    }
    return arr;
}

console.log(parseInput(input))
// const arr = parseStringifiedArray('1,[2,[3,[4,[5,6,0]]]],8,9')
