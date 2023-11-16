const { Transform } = require("stream");

const replaceWordProcessing = new Transform({
  transform(chunk, encoding, callback) {
    console.log("chunk : ", chunk.toString());

    // the gi in regex, g stands for global and i stands for case insensitiove , thus it will take any upper case or lower case fuck
    const finalString = chunk
      .toString()
      .replaceAll(/fuck/gi, "****")
      .toUpperCase();

    callback(null, finalString);
  },
});

module.exports = replaceWordProcessing;
