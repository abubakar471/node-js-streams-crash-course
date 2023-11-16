const http = require("http");
const fs = require("fs");
const { Transform } = require("stream");

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
      // the gi in regex, g stands for global and i stands for case insensitiove , thus it will take any upper case or lower case fuck
      const finalString = chunk
        .toString()
        .replaceAll(/fuck/gi, "****")
        .toUpperCase();

      // now akhane data processing sesh hoi jaoar por data k samner pipe a return kore dite hobe
      // jar jonno amra amader callback function take use korbo.

      // callback function tar first parameter ta holo, error. jeta kina ai khetre null
      callback(null, finalString);
    },
  });

  //   sampleFileStream.on("data", (chunk) => {
  //     console.log("data recieved : ", chunk);

  //     // process
  //     const finalString = chunk
  //       .toString()
  //       .replaceAll(/fuck/gi, "****")
  //       .toUpperCase();

  //     outputWritableStream.write(finalString);
  //   });

  //   we are saying top pipe or join our sampleReadable stream to the writableStream
  //   sampleFileStream.pipe(outputWritableStream);

  // in our pipe , there might be error occurs in any of our stream and we can handle but listening to events like error .on('error')

  // does that job here.
  // now the problem in here , is that , we have to listen to error for every pipe, if we just add one
  // error listening event , it will only listen to the event that is on top of it. but if any error occurs
  // under this event it will not listen to it. so, to takle it we can add event listener for every pipe

  // now even this is a hard solution to implement , so what can we do to make it much more easier, yeah
  // there is a way and the way is using pipeline.
  // see the file transform_stream_three.js to understand how can we add pipeline for the very same prolbem

  sampleFileStream
    .pipe(transformStream)
    .on("error", (err) => {
      console.log("error : ", err);
    })
    .pipe(outputWritableStream)
    .on("error", (err) => {
      console.log("error : ", err);
    });
  // the pipe method has a rule that is jekhan theke data antasi ba jetar theke first pipe kortasi setake hoite
  // hobe readableStream ar jetate pipe kortasi setake hoite hobe writable stream, in that case
  // sampleFileStream theke pipe kortasi jeta kina readableStream ar transformStream and outputWritableStream
  // a pipe kortasi jegula hoilo writable stream
  //   but transform stream use korar main karon hoilo ata readable and writable both kind of stream, tai atar
  // majhe amra data processing onek advanced ar optimized way te korte parbo, jevaebe amra trasform_stream.js
  // file a korsi sevabe nah, karon seta optimized way na data processing ar.

  //   now think , jeta age bollam jodi, transform stream use na kortam, taile amra je
  //  sampleFileStream.pipe(transformStream).pipe(outputWritableStream) lekhsi sekhaner
  // transformStream ke abar outputWritableStream  ar sathe pipe korsi, tai outputWritableStreamm ar ager stream
  // take must be akta readable stream hoite hoito, ar sampleFileStream theke pipe koray, sampleFileStream r
  // porer stream take writable hoite hoito, tai sudhu writable ba sudhu readble use korle sera akta peray porte
  // hoito, ar ai peray na porar jonnoi amra transform stream use korsi pipe ar through te, karon transform
  // stream readable and writable both.

  res.end();
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on port 8000...");
});
