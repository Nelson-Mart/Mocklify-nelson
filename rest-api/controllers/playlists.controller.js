const fs = require("fs");
const path = require("path");
const { playlistSchema } = require("../validation/playlists.schema");
const { patchPlaylistSchema } = require("../validation/playlists.schema");
//Number(req.params.id) gebruikt omdat id een nummer is in playlists.json
const playlistsJson = fs.readFileSync( path.join(__dirname, "..", "models", "playlists.json"));

function getAllPlaylists(req, res) {
  const playlists = JSON.parse(playlistsJson);

  const sort = req.query.sort;
  if (sort === "asc") {
    playlists.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  } else if (sort === "desc") {
    playlists.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }
  //localcompare om speciaal tekens correct te sorteren
  return res.status(200).json(playlists);
}

function getPlaylistById(req, res) {
  const id = Number(req.params.id);

  const playlists = JSON.parse(playlistsJson);
  const playlistId = playlists.findIndex((playlist) => Number(playlist.id) === id);
  const playlist = playlists[playlistId];
  if (playlistId === -1) {
    return res.status(404).json({});
  }
    return res.status(200).json(playlist);
}

function createPlaylist(req, res) {
  const { error } = playlistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing requried fields or invalid data types",
    errors: error.details
  });
  
  const playlists = JSON.parse(playlistsJson);

  const nextId = Math.max(...playlists.map(item => item.id)) + 1;
  
  const newPlaylist = { 
    id: nextId,
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
  const { error } = playlistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing requried fields or invalid data types",
    errors: error.details
  });
  const id = Number(req.params.id);

  const playlists = JSON.parse(playlistsJson);
  const playlistId = playlists.findIndex((playlist) => Number(playlist.id) === id);
  const playlist = playlists[playlistId];
  if (playlistId === -1) {
    return res.status(404).json({});
  }
  playlist.name = req.body.name;
  playlist.description = req.body.description;
  playlist.author = req.body.author;
  playlist.visibility = req.body.visibility;
  playlist.spotifyUrl = req.body.spotifyUrl;
  fs.writeFileSync(
  path.join(__dirname, "..", "models", "playlists.json"),
  JSON.stringify(playlists)
  );
  return res.status(200).json(playlist);
}

function patchPlaylist(req, res) {
  const { error } = patchPlaylistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing requried fields or invalid data types",
    errors: error.details
  });
  const id = Number(req.params.id);

  const playlists = JSON.parse(playlistsJson);
  const playlistId = playlists.findIndex((playlist) => Number(playlist.id) === id);

  if (playlistId === -1) {
    return res.status(404).json({});
  }

  const playlist = playlists[playlistId];

  if (req.body.name !== undefined) {
    playlist.name = req.body.name;
  }
  if (req.body.description !== undefined) {
    playlist.description = req.body.description;
  }
  if (req.body.author !== undefined) {
    playlist.author = req.body.author;
  }
  if (req.body.visibility !== undefined) {
    playlist.visibility = req.body.visibility;
  }
  if (req.body.spotifyUrl !== undefined) {
    playlist.spotifyUrl = req.body.spotifyUrl;
  }
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "playlists.json"),
    JSON.stringify(playlists)
  );
  return res.status(200).json(playlist);
}

function deletePlaylist(req, res) {
  const id = Number(req.params.id);

  const playlists = JSON.parse(playlistsJson);
  const playlistId = playlists.findIndex((playlist) => Number(playlist.id) === id);
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
  patchPlaylist,
  deletePlaylist,
};