const fs = require("fs");
const path = require("path");
const { trackSchema } = require("../validation/tracks.schema");
const { patchTrackSchema } = require("../validation/tracks.schema");
//Number(req.params.id) gebruikt omdat id een nummer is in tracks.json
const tracksJson = fs.readFileSync( path.join(__dirname, "..", "models", "tracks.json") );

function getAllTracks(req, res) {
  const tracks = JSON.parse(tracksJson);

  const { getAll, sort } = req.query;

  if (sort === "asc") {
    tracks.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  } else if (sort === "desc") {
    tracks.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }
  //localcompare om speciaal tekens correct te sorteren

  if (getAll) {
    const items = tracks.map((track) => { track[getAll]; return track[getAll]; });
    return res.status(200).json(items);
  }
  return res.status(200).json(tracks);
}

function getTrackById(req, res) {
  const id = Number(req.params.id);
  
  const tracks = JSON.parse(tracksJson);
  const trackId = tracks.findIndex((track) => Number(track.id) === id);
  const track = tracks[trackId];
  if (trackId === -1) {
    return res.status(404).json({});
  }
  return res.status(200).json(track);
}

function createTrack(req, res) {
  const { error } = trackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing requried fields or invalid data types",
    errors: error.details
  });

  const tracks = JSON.parse(tracksJson);

  const nextId = Math.max(...tracks.map(item => item.id)) + 1;
  const newTrack = { 
    id: nextId,
    name: req.body.name,
    bpm: req.body.bpm,
    durationSeconds: req.body.durationSeconds,
    releaseYear: req.body.releaseYear,
    artists: req.body.artists,
    genres: req.body.genres,
    spotifyUrl: req.body.spotifyUrl
  };
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "tracks.json"),
    JSON.stringify([...tracks, newTrack])
  );
  return res.status(201).json(newTrack);
}

function updateTrack(req, res) {
  const { error } = trackSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing requried fields or invalid data types",
    errors: error.details
  });
  const id = Number(req.params.id);

  const tracks = JSON.parse(tracksJson);
  const trackId = tracks.findIndex((track) => Number(track.id) === id);
  const track = tracks[trackId];
  if (trackId === -1) {
    return res.status(404).json({});
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
    message: "Missing requried fields or invalid data types",
    errors: error.details
  });
  const id = Number(req.params.id);

  const tracks = JSON.parse(tracksJson);
  const trackId = tracks.findIndex((track) => Number(track.id) === id);
  const track = tracks[trackId];
  if (trackId === -1) {
    return res.status(404).json({});
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
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "tracks.json"),
    JSON.stringify(tracks)
  );
  return res.status(200).json(track);
}

function deleteTrack(req, res) {
  const id = Number(req.params.id);

  const tracks = JSON.parse(tracksJson);
  const trackId = tracks.findIndex((track) => Number(track.id) === id);
  if (trackId === -1) {
    return res.status(404).json({});
  }
  tracks.splice(trackId, 1);
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "tracks.json"),
    JSON.stringify(tracks)
  );
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