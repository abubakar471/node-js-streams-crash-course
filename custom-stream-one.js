const { Readable, Writable } = require("stream");
const readableStream = new Readable({
  // highwatermark is a threshold. its not like the limit of the buffer  but it defines
  // a range of how much data is being sent, in below 6 means 6 bytes. one charater = 2 bytes
  highWaterMark: 6,
  read() {},
});

// writable stream
const writableStream = new Writable({
  write(s) {
    console.log("writing chunk: ", s.toString());
  },
});

readableStream.on("data", (chunk) => {
  console.log("reading chunk : ", chunk.toString());
  writableStream.write(chunk);
});

readableStream.push("Hello from coders gyan");
