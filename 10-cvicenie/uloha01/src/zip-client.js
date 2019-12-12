const fs = require("fs");
const http = require("http");
const path = require("path");
const { pipeline } = require("stream");

module.exports = client;

function client(file_path, port = 9999){
    if (!fs.existsSync(file_path) || !fs.statSync(file_path).isFile()){
      console.log("err: no such file");
      return "no such file";
    }
    const read = fs.createReadStream(file_path);
    const write = fs.createWriteStream(`${file_path}.gz`);

    let url = `http://localhost:${port}/`;
    const request = http.request(url, { method: "POST" });
    request.setHeader("name", path.basename(file_path));

    pipeline(
      read,
      request,
      err => {
        if(err)
          console.log('err: zip request');
      }
    );

    request.on('response', res => {
        pipeline(
            res,
            write,
            err => {
                if (err) {
                    console.log('err: writing to file');
                    fs.unlinkSync(`${file_path}.gz`);
                }
                else {
                    console.log('zip stored');
                }
            }
        );
    })
    .on('finish', ()=>{
      return;
    });
}

// client(process.argv[2]);
