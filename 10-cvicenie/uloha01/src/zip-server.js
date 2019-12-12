const fs = require('fs');
const http = require('http');
const { pipeline } = require('stream');
const zlib = require('zlib');
module.exports = server;

function server(dir = 'src/server', port = 9999){

    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()){
      console.log("err: no such dir");
      return "no such dir";
    }

    return http.createServer((req,res)=>{
      const file_name = req.headers['name'];
      const write = fs.createWriteStream(`${dir}/${file_name}`);

      pipeline(
          req,
          write,
          (err) => {
              if (err) {
                  console.log('err: saving original');
                  fs.unlinkSync(`${dir}/${file_name}`);
              } else {
                  console.log('original saved...');
              }
          }
      );
      pipeline(
          req,
          zlib.createGzip(),
          res,
          (err) => {
              if (err) {
                  console.log('err: zipping');
              } else {
                  console.log('file zipped');
              }
          }
      );
    })
    .on('error', err => {
        if (err.code === 'EADDRINUSE')
          return "port busy";
        return console.log('err: server error');
    })
    .listen(port, "localhost");
}

// server(process.argv[2]);
