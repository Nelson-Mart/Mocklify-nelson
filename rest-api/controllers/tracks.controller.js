const { readJson, writeJson } = require("../utils/jsonHelper.js");
const { notFound, badRequest } = require("../utils/responses.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { trackSchema } = require("../validation/tracks.schema");
const { patchTrackSchema } = require("../validation/tracks.schema");

const tracksFile = path.join(__dirname, "..", "models", "tracks.json");

function getAllTracks(req, res) {
  let tracks = readJson(tracksFile);

  const { sort, genre, getAll } = req.query;

  if (sort === "asc") {
    tracks.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  } else if (sort === "desc") {
    tracks.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }
  //localcompare om speciaal tekens correct te sorteren

  if (genre) {
    tracks = tracks.filter(track =>
      track.genres.some(g =>
        g.toLowerCase().includes(genre.toLowerCase())
      )
    );
  }

  if (getAll) {
    const items = tracks.map((track) => { track[getAll]; return track[getAll]; });
    return res.status(200).json(items);
  }
  return res.status(200).json(tracks);
}

function getTrackById(req, res) {
  const id = req.params.id;
  
  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);
  const track = tracks[trackId];
  if (trackId === -1) {
    return notFound(res,"Track");
  }
  return res.status(200).json(track);
}

function createTrack(req, res) {
  const { error } = trackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const tracks = readJson(tracksFile);

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
  writeJson(tracksFile, tracks);
  return res.status(201).json(newTrack);
}

function updateTrack(req, res) {
  const { error } = trackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });
  const id = req.params.id;

  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);
  const track = tracks[trackId];
  if (trackId === -1) {
    return notFound(res,"Track");
  }
  track.name = req.body.name;
  track.bpm = req.body.bpm;
  track.durationSeconds = req.body.durationSeconds;
  track.releaseYear = req.body.releaseYear;
  track.artists = req.body.artists;
  track.genres = req.body.genres;
  tracks[trackId].spotifyUrl = req.body.spotifyUrl;
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "tracks.json"),
    JSON.stringify(tracks)
  );
  return res.status(200).json(track);
}

function patchTrack(req, res) {
  const { error } = patchTrackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });
  const id = req.params.id;

  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);
  const track = tracks[trackId];
  if (trackId === -1) {
    return notFound(res,"Track");
  }
  if (req.body.name !== undefined) {
    track.name = req.body.name;
  }
  if (req.body.bpm !== undefined) {
    track.bpm = req.body.bpm;
  }
  if (req.body.durationSeconds !== undefined) {
    track.durationSeconds = req.body.durationSeconds;
  }
  if (req.body.releaseYear !== undefined) {
    track.releaseYear = req.body.releaseYear;
  }
  if (req.body.artists !== undefined) {
    track.artists = req.body.artists;
  }
  if (req.body.genres !== undefined) {
    track.genres = req.body.genres;
  }
  if (req.body.spotifyUrl !== undefined) {
    track.spotifyUrl = req.body.spotifyUrl;
  }
  writeJson(tracksFile, tracks);
  return res.status(200).json(track);
}

function deleteTrack(req, res) {
  const id = req.params.id;

  const tracks = readJson(tracksFile);
  const trackId = tracks.findIndex((track) => track.id === id);
  if (trackId === -1) {
    return notFound(res,"Track");
  }
  tracks.splice(trackId, 1);
  writeJson(tracksFile, tracks);
  return res.status(200).json({ message: "Track deleted" });
}

module.exports = {
  getAllTracks,
  getTrackById,
  createTrack,
  updateTrack,
  patchTrack,
  deleteTrack,
};