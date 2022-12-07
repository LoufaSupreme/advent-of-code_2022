const fs = require('fs');

const input = fs.readFileSync('input.txt')
    .toString()
    .split('\n')

// const input = `\
// $ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`.split('\n');

const dirs = [];
const dir_sizes = {};
let currentPath = "/";

function parseInput() {
    for (const line of input) {
        // if line starts with a command like cd or ls
        if (line[0] === "$") {
            const [symbol, cmd, path] = line.split(' ');
            // if its an ls cmd do nothing
            if (!path) continue;
            if (path === '..') {
                currentPath = findPreviousPath(currentPath);
            }
            // otherwise it's a cd cmb
            else {
                const nextPath = findNextPath(currentPath, path);
                if (!dirs.includes(nextPath)) dirs.push(nextPath)
                currentPath = nextPath;
            }
        }
        // otherwise its a file or directory
        else {
            const [size, location] = line.split(' ');
            // if its a file
            if (!isNaN(parseInt(size))) {
                addSizeToPath(currentPath, parseInt(size));
                addSizeToParentPaths(currentPath, parseInt(size))
            }
        }
    }
    return dirs;
}

function findPreviousPath(currentPath) {
    prevPath = currentPath.split('/').slice(0, -2);
    prevPath.push("");
    prevPath = prevPath.join('/');
    return prevPath;
}

function findNextPath(currentPath, destination) {
    const nextPath = destination !== '/' ? `${currentPath}${destination}/` : currentPath
    return nextPath;
}

function addSizeToPath(path, size) {
    if (!dir_sizes[path]) {
        dir_sizes[path] = size;
    }
    else {
        dir_sizes[path] += size;
    }
}

function addSizeToParentPaths(currentPath, size) {
    let path = currentPath;
    while (path !== '') {
        path = findPreviousPath(path);
        addSizeToPath(path, size);
    }
}

function calculateDirectorySize(size) {
    let totalSmallDirs = 0;
    const seen = [];
    for (let dir of dirs) {
        if (dir === '/' || seen.includes(dir)) {
            // console.log(`already seen ${dir}`)
            continue
        }
        let subDirTotal = 0
        while (dir !== "/" && !seen.includes(dir)) {
            if (dir_sizes[dir] <= size) {
                // console.log(`Small Dir: ${dir}`)
                subDirTotal += dir_sizes[dir]
                console.log(`added ${dir}: +${dir_sizes[dir]}`)
            }
            seen.push(dir);
            dir = dir.split('/').slice(0,-2)
            dir.push("");
            dir = dir.join('/');
        }
        totalSmallDirs += subDirTotal;
    }
    return totalSmallDirs;
}

function sumSmallDirectorySizes(size) {
    const sum = Object.values(dir_sizes).reduce((acc, curr) => {
        return acc += curr <= size ? curr : 0;
    },0)
    console.log(sum)
}

parseInput()
sumSmallDirectorySizes(100000)


// console.log(dirs)
// console.log(dir_sizes)