const fs = require("fs").promises;
const path = require("path")

module.exports = lsRescursive

async function lsRescursive(dirName) {

  let dirs = await ls(dirName);
  dirs = dirsOnly(dirs);
  dirs = dirs.map(({ name }) => path.resolve(dirName, name));
  dirs = dirs.map(ls);
  let files = await Promise.all(dirs);
  files = files.flat(Infinity);
  files = filesOnly(files);
  return files.map(({ name }) => name);
}

async function ls(dirName) {
  return fs.readdir(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}
