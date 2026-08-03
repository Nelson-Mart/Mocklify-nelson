const { readJson, writeJson } = require("../utils/jsonHelper.js");
const { notFound, badRequest } = require("../utils/responses.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { playlistSchema } = require("../validation/playlists.schema");
const { patchPlaylistSchema } = require("../validation/playlists.schema");

const playlistsFile = path.join(__dirname,"..","models","playlists.json");

function getAllPlaylists(req, res) {
  let playlists = readJson(playlistsFile);

  const { sort, author, getAll } = req.query;

  if (sort === "asc") {
    playlists.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  } else if (sort === "desc") {
    playlists.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }
  //localcompare om speciaal tekens correct te sorteren

  if (author) {
    playlists = playlists.filter((playlist) =>
      playlist.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (getAll) {
    const items = playlists.map((playlist) => { playlist[getAll]; return playlist[getAll]; });
    return res.status(200).json(items);
  }
  return res.status(200).json(playlists);
}

function getPlaylistById(req, res) {
  const id = req.params.id;

  const playlists = readJson(playlistsFile);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);
  const playlist = playlists[playlistId];
  if (playlistId === -1) {
    return notFound(res,"Playlist");
  }
    return res.status(200).json(playlist);
}

function createPlaylist(req, res) {
  const { error } = playlistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });
  
  const playlists = readJson(playlistsFile);
  
  const newPlaylist = { 
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    visibility: req.body.visibility,
    spotifyUrl: req.body.spotifyUrl
  };
  writeJson(playlistsFile, playlists);
  return res.status(201).json(newPlaylist);
}

function updatePlaylist(req, res) {
  const { error } = playlistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });
  const id = req.params.id;

  const playlists = readJson(playlistsFile);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);
  const playlist = playlists[playlistId];
  if (playlistId === -1) {
    return notFound(res,"Playlist");
  }
  playlist.name = req.body.name;
  playlist.description = req.body.description;
  playlist.author = req.body.author;
  playlist.visibility = req.body.visibility;
  playlist.spotifyUrl = req.body.spotifyUrl;
  writeJson(playlistsFile, playlists);
  return res.status(200).json(playlist);
}

function patchPlaylist(req, res) {
  const { error } = patchPlaylistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });
  const id = req.params.id;

  const playlists = readJson(playlistsFile);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);

  if (playlistId === -1) {
    return notFound(res,"Playlist");
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
  writeJson(playlistsFile, playlists);
  return res.status(200).json(playlist);
}

function deletePlaylist(req, res) {
  const id = req.params.id;

  const playlists = readJson(playlistsFile);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);
  if (playlistId === -1) {
    return notFound(res,"Playlist");
  }
    playlists.splice(playlistId, 1);
    writeJson(playlistsFile, playlists);
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