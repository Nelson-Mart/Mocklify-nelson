const express = require("express");

const trackController = require("../controllers/tracks.controller");

const router = express.Router();

router.get("/", trackController.getAllTracks);
router.get("/:id", trackController.getTrackById);
router.post("/", trackController.createTrack);
router.put("/:id", trackController.updateTrack);
router.patch("/:id", trackController.patchTrack);
router.delete("/:id", trackController.deleteTrack);

module.exports = router;