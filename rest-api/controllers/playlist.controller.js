const fs = require("fs");
const path = require("path");

function getAllPlaylists(req, res) {
  const playlistsJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "playlists.json")
  );
  const playlists = JSON.parse(playlistsJson);
  return res.status(200).json(playlists);
}

module.exports = {
  getAllPlaylists,

};