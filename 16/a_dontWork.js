const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString();
const input = fs.readFileSync('sample.txt').toString();

function parseInput(input) {
    return input
        .split('\n')
        .map(valve => {
            const regex = /Valve (?<name>\w+) has flow rate=(?<flow>\d+); tunnel[s]? lead[s]? to valve[s]? (?<tunnels>.*)/;
            let {name, flow, tunnels} = valve.match(regex).groups;
            tunnels = tunnels.split(', ');
            flow = parseInt(flow);
            return {
                name,
                flow,
                tunnels
            }
        })
}

function openValves(valves) {
    const q = [{valve: valves[0], opened: [], time: 30}];
    let time = 30;
    const opened = [];

    while (time > 2) {
        current_valve = q.shift();
        // console.log(current_valve)
        let openedSoFar = [...current_valve.opened];
        if (!opened.includes(current_valve.valve.name)) {
            current_valve.time -= 1;
            time = current_valve.time - 1;
            opened.push(current_valve.valve.name)
            openedSoFar.push({
                name: current_valve.valve.name,
                flow: current_valve.valve.flow,
                time: current_valve.time
            })
        }
        time = current_valve.time - 1;
        for (const tunnel of current_valve.valve.tunnels) {
            const next_valve = {
                valve: valves.find(valve => valve.name === tunnel),
                time: current_valve.time - 1,
                opened: openedSoFar
            };
            q.push(next_valve);
        }
    }
    return q;
}

function main() {
    const valves = parseInput(input);
    // console.log(valves);
    const openedValves = openValves(valves)
        .map(valve => {
            return valve.opened.reduce((acc, curr) => {
                return acc += curr.flow * curr.time
            },0)
         })
         .sort((a,b) => b-a);

    console.log(openedValves)
}

main();
