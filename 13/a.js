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
    let stringArray = input
        .split('\n\n')
        .map(pair => {
            pair = pair.split('\n');
            return pair.map(strArr => {
                return strArr.map(char => char)
            })
        });
}

function parseStringifiedArray(str, arr = []) {
    const newArr = [];
    let returnedArr = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',') continue;
        else if (str[i] === '[') {
            const remainingStr = str.slice(i+1, str.length);
            returnedArr = parseStringifiedArray(remainingStr, newArr);
        }
        else if (str[i] === ']') {
            arr.push(returnedArr);
            return arr;
        }
        else {
            newArr.push(+str[i]);
        }
    }
}

// console.log(parseInput(input))
console.log(parseStringifiedArray('[4, [1]]'))
