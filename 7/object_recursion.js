const fs = require('fs');
const { createBrotliCompress } = require('zlib');

// const input = fs.readFileSync('input.txt')
//     .toString()
//     .split('\n')

const input = `\
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n');

const tree = {
    name: '/',
    isDirectory: true,
    children: [],
    parent: null,
}; //name, isDirectory, children, parent, size

function createTree() {
    let currentPath = tree;
    for (const line of input) {
        // if line starts with a command like cd or ls
        if (line[0] === "$") {
            const [symbol, cmd, path] = line.split(' ');
            // if its an ls cmd do nothing
            if (!path) continue;
            else if (path === '/') currentPath = tree;
            else if (path === '..') {
                currentPath = currentPath.parent;
            }
            // otherwise it's a cd cmb
            else {
                currentPath = currentPath.children.find((dir) => dir.isDirectory && dir.name === path);
            }
        }
        // otherwise its a file or directory
        else {
            const [size, location] = line.split(' ');
            // if its a file
            if (!isNaN(parseInt(size))) {
                const newNode = {
                    name: location,
                    isDirectory: false,
                    parent: currentPath,
                    children: null,
                    size: parseInt(size),
                }
                currentPath.children.push(newNode);
            }
            // its a directory
            else {
                const newNode = {
                    name: location,
                    isDirectory: true,
                    children: [],
                    parent: currentPath
                }
                currentPath.children.push(newNode)
            }
        }
    }
    return tree;
}

function displayTree(tree, depth = 0) {
    let node = tree;
    if (!node.isDirectory) {
        console.log(`${" ".repeat(depth*2)}- ${node.name} (file, size=${node.size})`)
    }
    else {
        console.log(`${" ".repeat(depth*2)}- ${node.name} (dir${node.size ? ', size='+node.size : ""})`)
        node.children.map(child => displayTree(child, depth+1))
    }
}


// calculate the total size of a node, including the sizes of all children nodes, recursively
function getSize(node, callback) {
    if (!node.isDirectory) return node.size;

    const directorySize = node.children
        .map(child => getSize(child, callback))
        .reduce((acc, curr) => acc += curr , 0);

    // console.log({name: node.name, size: directorySize})
    node.size = directorySize;

    callback(node.name, node.size);

    return directorySize;
}

// get cumulative size of all dirs with size under 100,000
function sumSmallDirs(tree) {

}

function main() {
    createTree();

    const maxDirectorySize = 100000;
    let sumSmallDirectorySizes = 0;
    getSize(tree, function cb(name, size) {
        console.log({ name:name, size:size });

        if (size <= maxDirectorySize) sumSmallDirectorySizes += size;
    });

    displayTree(tree);

    console.log(sumSmallDirectorySizes);
}

main()

