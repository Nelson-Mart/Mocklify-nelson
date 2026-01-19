const Joi = require("joi");
const playlistSchema = Joi.object({
  name: Joi.string().max(30).required(),
  description: Joi.string().max(255).required(),
  author: Joi.string().max(30).required(),
  visibility: Joi.string().valid("public", "private").required(),
  spotifyUrl: Joi.string().uri().required(),
});

module.exports = { playlistSchema };