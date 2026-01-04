const fs = require("fs");
const path = require("path");
//Number(req.params.id) gebruikt omdat id een nummer is in playlists.json

function getAllPlaylists(req, res) {
  const playlistsJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "playlists.json")
  );
  const playlists = JSON.parse(playlistsJson);
  return res.status(200).json(playlists);
}

function getPlaylistById(req, res) {
  const id = Number(req.params.id);
  const playlistsJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "playlists.json")
  );
  const playlists = JSON.parse(playlistsJson);
  const playlist = playlists.findIndex((playlist) => playlist.id === id);
    if (playlist === -1) {
    return res.status(404).json({});
  }
    return res.status(200).json(playlist);
}

function createPlaylist(req, res) {
  const playlistsJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "playlists.json")
  );
  const playlists = JSON.parse(playlistsJson);
  const newPlaylist = { 
    id: playlists.length + 1, 
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    visibility: req.body.visibility,
    spotifyUrl: req.body.spotifyUrl
  };
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "playlists.json"),
    JSON.stringify([...playlists, newPlaylist])
  );
  return res.status(201).json(newPlaylist);
}

function updatePlaylist(req, res) {
  const id = Number(req.params.id);
  const playlistsJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "playlists.json")
  );
    const playlists = JSON.parse(playlistsJson);
    const playlistId = playlists.findIndex((playlist) => playlist.id === id);
    if (playlistId === -1) {
    return res.status(404).json({});
  }
    playlists[playlistId].name = req.body.name;
    playlists[playlistId].description = req.body.description;
    playlists[playlistId].author = req.body.author;
    playlists[playlistId].visibility = req.body.visibility;
    playlists[playlistId].spotifyUrl = req.body.spotifyUrl;
    fs.writeFileSync(
    path.join(__dirname, "..", "models", "playlists.json"),
    JSON.stringify(playlists)
    );
    return res.status(200).json(playlists[playlistId]);
}

function deletePlaylist(req, res) {
  const id = Number(req.params.id);
  const playlistsJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "playlists.json")
  );
  const playlists = JSON.parse(playlistsJson);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);
    if (playlistId === -1) {
    return res.status(404).json({});
  }
    playlists.splice(playlistId, 1);
    fs.writeFileSync(
    path.join(__dirname, "..", "models", "playlists.json"),
    JSON.stringify(playlists)
    );
    return res.status(200).json({ message: "Playlist deleted" });
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};