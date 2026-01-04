const joi = require("joi");

const trackSchema = joi.object({
    title: joi.string().max(100).required(),
    bpm: joi.number().required(),
    durationSeconds: joi.number().required(),
    releaseYear: joi.number().required(),
    artists: joi.array().required(),
    genre: joi.string().max(30).required(),
    spotifyUrl: joi.string().uri().required(),
});

module.exports = { trackSchema };