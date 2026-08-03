const fs = require("fs");

function readJson(filePath) {
  return JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );
}


function writeJson(filePath, data) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );
}


module.exports = {
  readJson,
  writeJson
};