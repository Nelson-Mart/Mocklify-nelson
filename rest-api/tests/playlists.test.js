describe("GET playlists",()=>{

    test("returns playlists", async()=>{
    
    const response =
    await request(app)
    .get("/playlists");
    
    expect(response.statusCode)
    .toBe(200);
    
    });
    
    });