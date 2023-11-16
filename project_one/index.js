const http = require("http");
const fs = require("fs");
const replaceWordProcessing = require("./replaceWordProcessor");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end();
  }

  //   string processing, you can process anything in here like audio/video processing
  const sampleFileStream = fs.createReadStream("uncensor-messages.txt");
  const outputWritableStream = fs.createWriteStream("output.txt");

  sampleFileStream.pipe(replaceWordProcessing).pipe(outputWritableStream);

  res.end();
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
