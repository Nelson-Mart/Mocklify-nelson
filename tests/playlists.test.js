const request = require("supertest");
const app = require("../index.js");
let createdPlaylistId;

describe("GET playlists",()=>{

  test("returns playlists", async()=>{
  
    const response = await request(app)
    .get("/playlists");
    
    expect(response.statusCode)
    .toBe(200);
    
  });

});

describe("POST /playlists", () => {
  test("creates a playlist", async () => {

    const newPlaylist = {
        name: "Test Playlist",
        description: "Testing playlist",
        author: "Tester",
        visibility: "public",
        spotifyUrl: "https://open.spotify.com/test"
      };
      
    const response = await request(app)
      .post("/playlists")
      .send(newPlaylist);

    createdPlaylistId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");

  });
});

describe("GET /playlists/:id", () => {
  test("returns one playlist", async () => {

    const response = await request(app)
      .get(`/playlists/${createdPlaylistId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");

  });

  test("returns 404 if not found", async () => {

    const response = await request(app)
      .get("/playlists/999");

    expect(response.statusCode).toBe(404);

  });
});

describe("PUT /playlists/:id", () => {
  test("updates a playlist", async () => {
    const updated = {
      name: "Updated Playlist",
      description: "Updated",
      author: "Tester",
      visibility: "private",
      spotifyUrl: "https://open.spotify.com/updated"
    };

    const response = await request(app)
      .put(`/playlists/${createdPlaylistId}`)
      .send(updated);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated Playlist");
  });
});

describe("PATCH /playlists/:id", () => {
  test("partially updates a playlist", async () => {
    const response = await request(app)
      .patch(`/playlists/${createdPlaylistId}`)
      .send({ name: "Patched Name" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Patched Name");
  });
});

describe("DELETE /playlists/:id", () => {

  test("deletes a playlist", async () => {

    const response = await request(app)
      .delete(`/playlists/${createdPlaylistId}`);

    expect(response.statusCode).toBe(204);

  });
});