const server = require('../src/zip-server');
const client = require('../src/zip-client');

server('src/server');

client('src/client/test1.txt');
client('src/client/test2.txt');
client('src/client/test3.txt');
client('src/client/test4.txt');
