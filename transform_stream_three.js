const http = require("http");
const fs = require("fs");
const { Transform, pipeline } = require("stream");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end();
  }

  //   string processing, you can process anything in here like audio/video processing
  const sampleFileStream = fs.createReadStream("uncensor-messages.txt");
  const outputWritableStream = fs.createWriteStream("output.txt");

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      console.log("chunk : ", chunk.toString());
      // u can simulate an error by uncommenting the line below
      // transformStream.emit("error", new Error("Something went wrong!"));
      const finalString = chunk
        .toString()
        .replaceAll(/fuck/gi, "****")
        .toUpperCase();
      callback(null, finalString);
    }
  });

  //   the benefit of using pipeline is instead of listening for each pipes error , we can use only one error
  // handler to handle that error for every pipe using a callback inside of this pipeline
  pipeline(sampleFileStream, transformStream, outputWritableStream, (err) => {
    // we are putting the error handling inside of a if block , because if you don't then you will see its
    // code running even if you don't have an error
    if (err) {
      console.log("error handling here : ", err);
    }
  });

  res.end();
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
