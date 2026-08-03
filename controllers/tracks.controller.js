const { readJson, writeJson } = require("../utils/jsonHelper.js");
const { notFound } = require("../utils/responses.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { trackSchema } = require("../validation/tracks.schema");
const { patchTrackSchema } = require("../validation/tracks.schema");

const tracksFile = path.join(__dirname, "..", "models", "tracks.json");

/**
 * @typedef {Object} Track
 * @property {string} id UUID of the track
 * @property {string} name Track name
 * @property {number} bpm Beats per minute
 * @property {number} durationSeconds Duration in seconds
 * @property {number} releaseYear Release year
 * @property {string[]} artists List of artists
 * @property {string[]} genres List of genres
 * @property {string} spotifyUrl Spotify link
 */

/**
 * @typedef {Object} CreateTrackDTO
 * @property {string} name
 * @property {number} bpm
 * @property {number} durationSeconds
 * @property {number} releaseYear
 * @property {string[]} artists
 * @property {string[]} genres
 * @property {string} spotifyUrl
 */

/**
 * Retrieves all tracks
 *
 * Supports:
 * - Sorting (?sort=asc | desc)
 * - Filtering by genre (?genre=value)
 * - Selecting field (?getAll=fieldName)
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Track[]}
 */
function getAllTracks(req, res) {
  let tracks = readJson(tracksFile);

  const { sort, genre, getAll } = req.query;

  if (sort === "asc") {
    tracks.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  } else if (sort === "desc") {
    tracks.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }

  if (genre) {
    tracks = tracks.filter(track =>
      track.genres.some(g =>
        g.toLowerCase().includes(genre.toLowerCase())
      )
    );
  }

  if (getAll) {
    const items = tracks.map((track) => track[getAll]);
    return res.status(200).json(items);
  }

  return res.status(200).json(tracks);
}

/**
 * Retrieves a track by ID
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Track | void}
 */
function getTrackById(req, res) {
  const id = req.params.id;
  
  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);

  if (trackId === -1) {
    return notFound(res,"Track");
  }

  return res.status(200).json(tracks[trackId]);
}

/**
 * Creates a new track
 *
 * @param {import("express").Request & { body: CreateTrackDTO }} req
 * @param {import("express").Response} res
 * @returns {Track | void}
 */
function createTrack(req, res) {
  const { error } = trackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const tracks = readJson(tracksFile);

  /** @type {Track} */
  const newTrack = { 
    id: uuidv4(),
    name: req.body.name,
    bpm: req.body.bpm,
    durationSeconds: req.body.durationSeconds,
    releaseYear: req.body.releaseYear,
    artists: req.body.artists,
    genres: req.body.genres,
    spotifyUrl: req.body.spotifyUrl
  };

  tracks.push(newTrack);

  writeJson(tracksFile, tracks);
  return res.status(201).json(newTrack);
}

/**
 * Updates a track completely
 *
 * @param {import("express").Request & { body: CreateTrackDTO }} req
 * @param {import("express").Response} res
 * @returns {Track | void}
 */
function updateTrack(req, res) {
  const { error } = trackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const id = req.params.id;

  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);

  if (trackId === -1) {
    return notFound(res,"Track");
  }

  const track = tracks[trackId];

  track.name = req.body.name;
  track.bpm = req.body.bpm;
  track.durationSeconds = req.body.durationSeconds;
  track.releaseYear = req.body.releaseYear;
  track.artists = req.body.artists;
  track.genres = req.body.genres;
  track.spotifyUrl = req.body.spotifyUrl;

  writeJson(tracksFile, tracks);
  return res.status(200).json(track);
}

/**
 * Partially updates a track
 *
 * @param {import("express").Request & { body: Partial<CreateTrackDTO> }} req
 * @param {import("express").Response} res
 * @returns {Track | void}
 */
function patchTrack(req, res) {
  const { error } = patchTrackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const id = req.params.id;

  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);

  if (trackId === -1) {
    return notFound(res,"Track");
  }

  const track = tracks[trackId];

  if (req.body.name !== undefined) track.name = req.body.name;
  if (req.body.bpm !== undefined) track.bpm = req.body.bpm;
  if (req.body.durationSeconds !== undefined) track.durationSeconds = req.body.durationSeconds;
  if (req.body.releaseYear !== undefined) track.releaseYear = req.body.releaseYear;
  if (req.body.artists !== undefined) track.artists = req.body.artists;
  if (req.body.genres !== undefined) track.genres = req.body.genres;
  if (req.body.spotifyUrl !== undefined) track.spotifyUrl = req.body.spotifyUrl;

  writeJson(tracksFile, tracks);
  return res.status(200).json(track);
}

/**
 * Deletes a track
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
function deleteTrack(req, res) {
  const id = req.params.id;

  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);

  if (trackId === -1) {
    return notFound(res,"Track");
  }

  tracks.splice(trackId, 1);
  writeJson(tracksFile, tracks);

  return res.status(204).send();
}

module.exports = {
  getAllTracks,
  getTrackById,
  createTrack,
  updateTrack,
  patchTrack,
  deleteTrack,
};