const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end();
  }

  //   downloading big data bad way
  //   const file = fs.readFileSync("sample.txt");
  //   return res.end(file);

  //   downloading big files using good way(streams)

  //   in stream data is sent from readable stream to a writeable stream through a pipe
  //   the http req and res objects are also streams , req is a readable stream and res is a
  //   writeable stream
  //   below we are sending the readable stream to a writable stream , the writeable stream here is
  //   res object
    const readableStream = fs.createReadStream("sample.txt");
    readableStream.pipe(res);
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
