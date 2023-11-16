const http = require("http");
const fs = require("fs");
const Tranform = require("stream");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end();
  }

  //   string processing, you can process anything in here like audio/video processing
  const sampleFileStream = fs.createReadStream("uncensor-messages.txt");
  const outputWritableStream = fs.createWriteStream("output.txt");

  sampleFileStream.on("data", (chunk) => {
    console.log("data recieved : ", chunk);

    // process
    const finalString = chunk
      .toString()
      .replaceAll(/fuck/gi, "****")
      .toUpperCase();

    outputWritableStream.write(finalString);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
