const Joi = require("joi");
const trackSchema = Joi.object({
    name: Joi.string().max(100).required(),
    bpm: Joi.number().required(),
    durationSeconds: Joi.number().required(),
    releaseYear: Joi.number().required(),
    artists: Joi.array().required(),
    genres: Joi.array().items(Joi.string().max(30)).required(),
    spotifyUrl: Joi.string().uri().required(),
});

const patchTrackSchema = Joi.object({
    name: Joi.string().max(100),
    bpm: Joi.number(),
    durationSeconds: Joi.number(),
    releaseYear: Joi.number(),
    artists: Joi.array(),
    genres: Joi.array().items(Joi.string().max(30)),
    spotifyUrl: Joi.string().uri(),
});

module.exports = {
trackSchema,
patchTrackSchema,
};