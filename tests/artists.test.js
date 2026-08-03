const request = require("supertest");
const app = require("../index.js");
let createdArtistId;

describe("GET /artists", () => {

  test("returns all artists", async () => {

    const response = await request(app)
      .get("/artists");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

  });

});

describe("POST /artists", () => {
  test("creates an artist", async () => {

    const newArtist = {
      firstName: "Test",
      lastName: "Artist",
      about: "A test artist used for automated testing."
    };

    const response = await request(app)
      .post("/artists")
      .send(newArtist);

    createdArtistId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");

  });
});

describe("GET /artists/:id", () => {
  test("returns one artist", async () => {

    const response = await request(app)
      .get(`/artists/${createdArtistId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");

  });

  test("returns 404 if not found", async () => {

    const response = await request(app)
      .get("/artists/999");

    expect(response.statusCode).toBe(404);

  });
});

describe("PUT /artists/:id", () => {
  test("updates an artist", async () => {
    const updated = {
      firstName: "Updated",
      lastName: "Name",
      about: "An updated bio for the artist."
    };

    const response = await request(app)
      .put(`/artists/${createdArtistId}`)
      .send(updated);

    expect(response.statusCode).toBe(200);
    expect(response.body.lastName).toBe("Name");
  });
});

describe("PATCH /artists/:id", () => {
  test("partially updates an artist", async () => {
    const response = await request(app)
      .patch(`/artists/${createdArtistId}`)
      .send({ firstName: "Patched" });

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe("Patched");
  });
});

describe("DELETE /artists/:id", () => {

  test("deletes an artist", async () => {

    const response = await request(app)
      .delete(`/artists/${createdArtistId}`);

    expect(response.statusCode).toBe(204);

  });
});