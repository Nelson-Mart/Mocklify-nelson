const express = require("express");

const artistController = require("../controllers/artists.controller");

const router = express.Router();

router.get("/", artistController.getAllArtists);
router.get("/:id", artistController.getArtistById);
router.post("/", artistController.createArtist);
router.put("/:id", artistController.updateArtist);
router.patch("/:id", artistController.patchArtist);
router.delete("/:id", artistController.deleteArtist);

module.exports = router;