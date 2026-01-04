const fs = require("fs");
const path = require("path");
//Number(req.params.id) gebruikt omdat id een nummer is in tracks.json

function getAllTracks(req, res) {
  const tracksJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "tracks.json")
  );
  const tracks = JSON.parse(tracksJson);
  return res.status(200).json(tracks);
}

function getTrackById(req, res) {
  const id = Number(req.params.id);
  const tracksJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "tracks.json")
  );
  const tracks = JSON.parse(tracksJson);
  const track = tracks.findIndex((track) => track.id === id);
  if (track === -1) {
    return res.status(404).json({});
  }
  return res.status(200).json(track);
}

function createTrack(req, res) {
  const tracksJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "tracks.json")
  );
  const tracks = JSON.parse(tracksJson);
  const newTrack = { 
    id: tracks.length + 1, 
    title: req.body.title,
    bpm: req.body.bpm,
    durationSeconds: req.body.durationSeconds,
    releaseYear: req.body.releaseYear,
    artists: req.body.artists,
    genre: req.body.genre,
    spotifyUrl: req.body.spotifyUrl
  };
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "tracks.json"),
    JSON.stringify([...tracks, newTrack])
  );
  return res.status(201).json(newTrack);
}

function updateTrack(req, res) {
  const id = Number(req.params.id);
  const tracksJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "tracks.json")
  );
  const tracks = JSON.parse(tracksJson);
  const trackId = tracks.findIndex((track) => track.id === id);
  if (trackId === -1) {
    return res.status(404).json({});
  }
  tracks[trackId].title = req.body.title;
  tracks[trackId].bpm = req.body.bpm;
  tracks[trackId].durationSeconds = req.body.durationSeconds;
  tracks[trackId].releaseYear = req.body.releaseYear;
  tracks[trackId].artists = req.body.artists;
  tracks[trackId].genre = req.body.genre;
  tracks[trackId].spotifyUrl = req.body.spotifyUrl;
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "tracks.json"),
    JSON.stringify(tracks)
  );
  return res.status(200).json(tracks[trackId]);
}

function deleteTrack(req, res) {
  const id = Number(req.params.id);
  const tracksJson = fs.readFileSync(
    path.join(__dirname, "..", "models", "tracks.json")
  );
  const tracks = JSON.parse(tracksJson);
  const trackId = tracks.findIndex((track) => track.id === id);
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
  deleteTrack,
};