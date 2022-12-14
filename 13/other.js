const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString();
const input = fs.readFileSync('input.txt').toString()
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim(); // Remove starting/ending whitespace

// Return a new object to avoid side effects between part 1 and 2
function getInput1() {
  return input.split("\n\n").map((group) => {
    const [left, right] = group.split("\n").map((line) => JSON.parse(line));
    return {
      left,
      right,
    };
  });
}

function getInput2() {
  return input
    .replace(/\n\n/g, "\n")
    .split("\n")
    .map((line) => JSON.parse(line));
}

function checkOrder(left, right, result) {
  const leftIsNumber = typeof left === "number";
  const rightIsNumber = typeof right === "number";
  if (leftIsNumber && rightIsNumber) {
    if (left < right) {
      result.rightOrder = true;
      return;
    }
    if (left > right) {
      result.rightOrder = false;
      return;
    }
  } else if (!leftIsNumber && !rightIsNumber) {
    let index = 0;
    while (true) {
      // console.log({ left, right, leftIsNumber, rightIsNumber });
      if (index > left.length - 1 && index <= right.length - 1) {
        // left ran out of items
        result.rightOrder = true;
        return;
      } else if (index <= left.length - 1 && index > right.length - 1) {
        // right ran out of items
        result.rightOrder = false;
        return;
      } else if (index > left.length - 1 && index > right.length - 1) {
        // no decision, both lists ran out of items
        return;
      }

      // compare the two elements
      checkOrder(left[index], right[index], result);
      // if we have set the variable rightOrder, stop
      if (typeof result.rightOrder !== "undefined") {
        return;
      }

      index++;
    }
  } else {
    if (leftIsNumber) {
      checkOrder([left], right, result);
    } else {
      checkOrder(left, [right], result);
    }
  }
}

function part1() {
    const groups = getInput1();
  
    const results = [];
    groups
      .map(({ left, right }, index) => {
        let result = {};
        checkOrder(left, right, result);
        // console.log(result.rightOrder);
        if (result.rightOrder) {
            results.push(index)
        }
        else {
                    
        }
      })
  
    console.log(results);
  }
  

function part2() {
  const input = getInput2().concat([[[2]], [[6]]]);

  const strings = input
    .sort((a, b) => {
      const result = {};
      checkOrder(a, b, result);
      return result.rightOrder ? -1 : 1;
    })
    .map((x) => JSON.stringify(x));

  const position2 = strings.indexOf("[[2]]") + 1;
  const position6 = strings.indexOf("[[6]]") + 1;

  console.log(position2 * position6);
}

// part1();
// part2();

let result = {}
checkOrder( [[0,[[0],5,[6,3,3],[10,3,10,9]],4]], [[],[5],[8],[[[10,8,10,5,3],[3,7,10,9,8],0],[[],[]]]], result ) 
console.log(result) // false

