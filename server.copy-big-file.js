const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end();
  }

  //   copy big file using bad way
  //   const file = fs.readFileSync("sample.txt");
  //   fs.writeFileSync("output.txt", file);
  //   res.end();

  // copy big file the good way
  const readStream = fs.createReadStream("blogs.txt");
  const writeStream = fs.createWriteStream("output.txt");

  //   now we are not sending the data using res object which is a writeable stream and we must have
  //   a writeable stream thats why we declared and created an writeStream variable  and it will fill the gap
  // of res object as we don't using it as writeable stream

  readStream.on("data", (chunk) => {
    console.log("chunk : ", chunk.toString());

    writeStream.write(chunk);
  });

  res.end();
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
