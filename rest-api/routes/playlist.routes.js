const express = require("express");

const playlistController = require("../controllers/playlist.controller");

router.get("/", playlistController.getAllPlaylists);

const router = express.Router();