const { readJson, writeJson } = require("../utils/jsonHelper.js");
const { notFound } = require("../utils/responses.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { artistSchema } = require("../validation/artists.schema");
const { patchArtistSchema } = require("../validation/artists.schema");

const artistsFile = path.join(__dirname, "..", "models", "artists.json");

/**
 * @typedef {Object} Artist
 * @property {string} id UUID of the artist
 * @property {string} firstName First name of the artist
 * @property {string} lastName Last name of the artist
 * @property {string} about Short bio of the artist
 */

/**
 * @typedef {Object} CreateArtistDTO
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} about
 */

/**
 * Retrieves all artists
 *
 * Supports:
 * - Sorting (?sort=asc | desc) - sorts by first name
 * - Filtering by first name (?firstName=value)
 * - Selecting field (?getAll=fieldName)
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Artist[]}
 */
function getAllArtists(req, res) {
  let artists = readJson(artistsFile);

  const { sort, firstName, getAll } = req.query;

  if (sort === "asc") {
    artists.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
  } else if (sort === "desc") {
    artists.sort((a, b) => b.firstName.toLowerCase().localeCompare(a.firstName.toLowerCase()));
  }

  if (firstName) {
    artists = artists.filter((artist) =>
      artist.firstName.toLowerCase().includes(firstName.toLowerCase())
    );
  }

  if (getAll) {
    const items = artists.map((artist) => artist[getAll]);
    return res.status(200).json(items);
  }

  return res.status(200).json(artists);
}

/**
 * Retrieves an artist by ID
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Artist | void}
 */
function getArtistById(req, res) {
  const id = req.params.id;

  const artists = readJson(artistsFile);
  const artistId = artists.findIndex((artist) => artist.id === id);

  if (artistId === -1) {
    return notFound(res, "Artist");
  }

  return res.status(200).json(artists[artistId]);
}

/**
 * Creates a new artist
 *
 * @param {import("express").Request & { body: CreateArtistDTO }} req
 * @param {import("express").Response} res
 * @returns {Artist | void}
 */
function createArtist(req, res) {
  const { error } = artistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const artists = readJson(artistsFile);

  /** @type {Artist} */
  const newArtist = {
    id: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    about: req.body.about
  };

  artists.push(newArtist);

  writeJson(artistsFile, artists);
  return res.status(201).json(newArtist);
}

/**
 * Updates an artist completely
 *
 * @param {import("express").Request & { body: CreateArtistDTO }} req
 * @param {import("express").Response} res
 * @returns {Artist | void}
 */
function updateArtist(req, res) {
  const { error } = artistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const id = req.params.id;

  const artists = readJson(artistsFile);
  const artistId = artists.findIndex((artist) => artist.id === id);

  if (artistId === -1) {
    return notFound(res, "Artist");
  }

  const artist = artists[artistId];

  artist.firstName = req.body.firstName;
  artist.lastName = req.body.lastName;
  artist.about = req.body.about;

  writeJson(artistsFile, artists);
  return res.status(200).json(artist);
}

/**
 * Partially updates an artist
 *
 * @param {import("express").Request & { body: Partial<CreateArtistDTO> }} req
 * @param {import("express").Response} res
 * @returns {Artist | void}
 */
function patchArtist(req, res) {
  const { error } = patchArtistSchema.validate(req.body);
  if (error) return res.status(400).json({
    message: "Missing required fields or invalid data types",
    errors: error.details
  });

  const id = req.params.id;

  const artists = readJson(artistsFile);
  const artistId = artists.findIndex((artist) => artist.id === id);

  if (artistId === -1) {
    return notFound(res, "Artist");
  }

  const artist = artists[artistId];

  if (req.body.firstName !== undefined) artist.firstName = req.body.firstName;
  if (req.body.lastName !== undefined) artist.lastName = req.body.lastName;
  if (req.body.about !== undefined) artist.about = req.body.about;

  writeJson(artistsFile, artists);
  return res.status(200).json(artist);
}

/**
 * Deletes an artist
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
function deleteArtist(req, res) {
  const id = req.params.id;

  const artists = readJson(artistsFile);
  const artistId = artists.findIndex((artist) => artist.id === id);

  if (artistId === -1) {
    return notFound(res, "Artist");
  }

  artists.splice(artistId, 1);
  writeJson(artistsFile, artists);

  return res.status(204).send();
}

module.exports = {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  patchArtist,
  deleteArtist,
};