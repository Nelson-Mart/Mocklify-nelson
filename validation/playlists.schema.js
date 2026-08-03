const Joi = require("joi");
const playlistSchema = Joi.object({
  name: Joi.string().max(30).required(),
  description: Joi.string().max(255).required(),
  author: Joi.string().max(30).required(),
  visibility: Joi.string().valid("public", "private").required(),
  spotifyUrl: Joi.string().uri().required(),
});

const patchPlaylistSchema = Joi.object({
  name: Joi.string().max(30),
  description: Joi.string().max(255),
  author: Joi.string().max(30),
  visibility: Joi.string().valid("public", "private"),
  spotifyUrl: Joi.string().uri(),
});

module.exports = {
  playlistSchema,
  patchPlaylistSchema,
};