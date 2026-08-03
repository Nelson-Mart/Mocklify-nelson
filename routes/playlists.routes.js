const express = require("express");

const playlistController = require("../controllers/playlists.controller");

const router = express.Router();

router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlaylistById);
router.post("/", playlistController.createPlaylist);
router.put("/:id", playlistController.updatePlaylist);
router.patch("/:id", playlistController.patchPlaylist);
router.delete("/:id", playlistController.deletePlaylist);

module.exports = router;