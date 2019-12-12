const assert = require("assert");
const fs = require("fs");
const crypto = require("crypto");

describe("cvicenie10", function() {

  const client = require("../src/zip-client.js");
  const server = require("../src/zip-server.js");

  describe("Client", function() {
    it("File needs to exist", function() {
      assert(client("slon"), "no such file");
    });
  });

  describe("Server", function() {
    it("Directory needs to exist", function() {
      assert(server("blabla"), "no such dir");
    });
  });

  describe("File Transfer Tests", () => {

  	it("Files are transferred correctly", () => {
      let files = ['test1.txt', 'test2.txt', 'test3.txt', 'test4.txt'];
      files.forEach((file) => {
          const file_c = fs.readFileSync(`src/client/${file}`);
          const file_s = fs.readFileSync(`src/server/${file}`);
          const hash_c = crypto.createHash('sha1').update(file_c).digest().toString();
          const hash_s = crypto.createHash('sha1').update(file_s).digest().toString();
          assert(hash_c == hash_s);
      });
  	});

  });
});
