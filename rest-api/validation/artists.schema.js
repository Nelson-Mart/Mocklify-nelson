const Joi = require("joi");

const artistSchema = Joi.object({
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),
  about: Joi.string().max(255).required(),
});

const patchArtistSchema = Joi.object({
  firstName: Joi.string().max(30),
  lastName: Joi.string().max(30),
  about: Joi.string().max(255),
});

module.exports = {
  artistSchema,
  patchArtistSchema,
};