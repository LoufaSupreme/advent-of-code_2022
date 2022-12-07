const fs = require('fs');


const input = fs.readFileSync('input.txt').toString();

// const input = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

const packetSize = 14;

 

function isAllUnique(str) {

    const counter = {};

    for (const letter of str) {

        if (!counter[letter]) counter[letter] = 1;

        else return false;

    }

    return true;

}

 

function findPacketStart(input) {

    for (let i = 0; i < input.length; i++) {

        const slice = input.slice(i, i+packetSize);

        if (isAllUnique(slice)) return i+packetSize;

    }

    return 'This is just white noise'

}

 

console.log(findPacketStart(input))


