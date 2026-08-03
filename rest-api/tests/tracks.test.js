const request = require("supertest");
const app = require("../index.js");
let createdTrackId;

describe("GET /tracks", () => {

  test("returns all tracks", async () => {

    const response = await request(app)
      .get("/tracks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

  });

});

describe("POST /tracks", () => {
  test("creates a track", async () => {

    const newTrack = {
        name: "Test Track",
        bpm: 120,
        durationSeconds: 200,
        releaseYear: 2025,
        artists: [
          "Test Artist"
        ],
        genres: [
          "Pop"
        ],
        spotifyUrl: "https://open.spotify.com/test"
      };

    const response = await request(app)
      .post("/tracks")
      .send(newTrack);
    
    createdTrackId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");

  });

});

describe("GET /tracks/:id", () => {
  test("returns one track", async () => {
    const response = await request(app)
      .get(`/tracks/${createdTrackId}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /tracks/:id", () => {
  test("updates a track", async () => {
    const updated = {
      name: "Updated Track",
      bpm: 130,
      durationSeconds: 210,
      releaseYear: 2024,
      artists: ["Updated Artist"],
      genres: ["Rock"],
      spotifyUrl: "https://open.spotify.com/updated"
    };

    const response = await request(app)
      .put(`/tracks/${createdTrackId}`)
      .send(updated);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated Track");
  });
});

describe("PATCH /tracks/:id", () => {
  test("partially updates a track", async () => {
    const response = await request(app)
      .patch(`/tracks/${createdTrackId}`)
      .send({ name: "Patched Track" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Patched Track");
  });
});

describe("DELETE /tracks/:id", () => {
  test("deletes a track", async () => {
    const response = await request(app)
      .delete(`/tracks/${createdTrackId}`);

    expect(response.statusCode).toBe(204);
  });
});