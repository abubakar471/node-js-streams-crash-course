const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end();
  }

  //   downloading big data bad way

  //   const file = fs.readFileSync("song.mp3");
  //   res.writeHead(200, { "Content-Type": "audio/mp3" });
  //   return res.end(file);

  //   downloading big files using good way(streams)

  const readableStream = fs.createReadStream("song.mp3");
  res.writeHead(200, { "Content-Type": "audio/mp3" });
  readableStream.pipe(res);
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
