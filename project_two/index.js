const fs = require("fs");
const writeableStream = fs.createWriteStream('logs.txt');

// pipe left side stream had to be a readable stream and right side had to be a writable stream
// so, process.stdin is readable and writeableStream is writeable stream
process.stdin.pipe(writeableStream);