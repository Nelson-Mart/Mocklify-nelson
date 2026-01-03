const express = require("express");

const trackController = require("../controllers/track.controller");

router.get("/", trackController.getAllTracks);

const router = express.Router();