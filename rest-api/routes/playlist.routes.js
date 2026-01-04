const express = require("express");

const playlistController = require("../controllers/playlist.controller");

router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlaylistById);
router.post("/", playlistController.createPlaylist);
router.put("/:id", playlistController.updatePlaylist);
router.delete("/:id", playlistController.deletePlaylist);

const router = express.Router();