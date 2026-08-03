const express = require('express');
const playlistRoutes = require("./routes/playlists.routes.js");
const trackRoutes = require("./routes/tracks.routes.js");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/playlists", playlistRoutes);
app.use("/tracks", trackRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;