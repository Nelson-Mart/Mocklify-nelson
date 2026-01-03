const fs = require("fs");
const path = require("path");

function getAllTracks(req, res) {
  const tracksJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "tracks.json")
  );
  const tracks = JSON.parse(tracksJson);
  return res.status(200).json(tracks);
}

module.exports = {
  getAllTracks,

};