const { readJson, writeJson } = require("../utils/jsonHelper.js");
const { notFound } = require("../utils/responses.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { playlistSchema } = require("../validation/playlists.schema");
const { patchPlaylistSchema } = require("../validation/playlists.schema");

const playlistsFile = path.join(__dirname,"..","models","playlists.json");

/**
 * @typedef {Object} Playlist
 * @property {string} id UUID of the playlist
 * @property {string} name Name of the playlist
 * @property {string} description Description of the playlist
 * @property {string} author Creator of the playlist
 * @property {"public"|"private"} visibility Visibility setting
 * @property {string} spotifyUrl Spotify link
 */

/**
 * @typedef {Object} CreatePlaylistDTO
 * @property {string} name
 * @property {string} description
 * @property {string} author
 * @property {"public"|"private"} visibility
 * @property {string} spotifyUrl
 */

/**
 * Retrieves all playlists
 *
 * Supports:
 * - Sorting (?sort=asc | desc)
 * - Filtering by author (?author=value)
 * - Selecting field (?getAll=fieldName)
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Playlist[]}
 */
function getAllPlaylists(req, res) {
  let playlists = readJson(playlistsFile);

  const { sort, author, getAll } = req.query;

  if (sort === "asc") {
    playlists.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  } else if (sort === "desc") {
    playlists.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }

  if (author) {
    playlists = playlists.filter((playlist) =>
      playlist.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (getAll) {
    const items = playlists.map((playlist) => playlist[getAll]);
    return res.status(200).json(items);
  }

  return res.status(200).json(playlists);
}

/**
 * Retrieves a playlist by ID
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Playlist | void}
 */
function getPlaylistById(req, res) {
  const id = req.params.id;

  const playlists = readJson(playlistsFile);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);

  if (playlistId === -1) {
    return notFound(res,"Playlist");
  }

  return res.status(200).json(playlists[playlistId]);
}

/**
 * Creates a new playlist
 *
 * @param {import("express").Request & { body: CreatePlaylistDTO }} req
 * @param {import("express").Response} res
 * @returns {Playlist | void}
 */
function createPlaylist(req, res) {
  const { error } = playlistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });
  
  const playlists = readJson(playlistsFile);
  
  /** @type {Playlist} */
  const newPlaylist = { 
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    visibility: req.body.visibility,
    spotifyUrl: req.body.spotifyUrl
  };

  playlists.push(newPlaylist);

  writeJson(playlistsFile, playlists);
  return res.status(201).json(newPlaylist);
}

/**
 * Updates a playlist completely
 *
 * @param {import("express").Request & { body: CreatePlaylistDTO }} req
 * @param {import("express").Response} res
 * @returns {Playlist | void}
 */
function updatePlaylist(req, res) {
  const { error } = playlistSchema.validate(req.body);
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

  playlist.name = req.body.name;
  playlist.description = req.body.description;
  playlist.author = req.body.author;
  playlist.visibility = req.body.visibility;
  playlist.spotifyUrl = req.body.spotifyUrl;

  writeJson(playlistsFile, playlists);
  return res.status(200).json(playlist);
}

/**
 * Partially updates a playlist
 *
 * @param {import("express").Request & { body: Partial<CreatePlaylistDTO> }} req
 * @param {import("express").Response} res
 * @returns {Playlist | void}
 */
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

  if (req.body.name !== undefined) playlist.name = req.body.name;
  if (req.body.description !== undefined) playlist.description = req.body.description;
  if (req.body.author !== undefined) playlist.author = req.body.author;
  if (req.body.visibility !== undefined) playlist.visibility = req.body.visibility;
  if (req.body.spotifyUrl !== undefined) playlist.spotifyUrl = req.body.spotifyUrl;

  writeJson(playlistsFile, playlists);
  return res.status(200).json(playlist);
}

/**
 * Deletes a playlist
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
function deletePlaylist(req, res) {
  const id = req.params.id;

  const playlists = readJson(playlistsFile);
  const playlistId = playlists.findIndex((playlist) => playlist.id === id);

  if (playlistId === -1) {
    return notFound(res,"Playlist");
  }

  playlists.splice(playlistId, 1);
  writeJson(playlistsFile, playlists);

  return res.status(204).send();
}

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  patchPlaylist,
  deletePlaylist,
};