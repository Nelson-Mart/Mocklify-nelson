# 🎶 Mockify API

Mockify is een eenvoudige REST API gebouwd met Node.js en Express.  
De API simuleert een deel van de Spotify API en laat toe om tracks en playlists te beheren via CRUD-operaties.

De data wordt opgeslagen in lokale JSON-bestanden, zonder gebruik van een externe database.

---

## 🚀 Technologies

- Node.js
- Express.js
- REST API
- Joi (input validation)
- Hoppscotch (testing)
- JSON (mock data)

---

## ⚙️ Installation

Clone de repository:

```bash
git clone <repository-url>

Installeer de dependencies:

npm install
Start de server:

npm run dev
# of
node index.js
De API is beschikbaar op:
http://localhost:3000

📁 Project Structure
rest-api/
├── controllers/
│   ├── tracks.controller.js
│   └── playlists.controller.js
├── models/
│   ├── tracks.json
│   └── playlists.json
├── routes/
│   ├── tracks.routes.js
│   └── playlists.routes.js
├── validation/
│   ├── tracks.schema.js
│   └── playlists.schema.js
├── index.js
├── package.json
└── README.md
📦 Resources
🎵 Tracks
Een track bevat:

id

name

bpm

durationSeconds

releaseYear

artists (array)

genres (array)

spotifyUrl

📀 Playlists
Een playlist bevat:

id

name

description

author

visibility (public / private)

spotifyUrl

🔗 Endpoints
Tracks
Method	Endpoint	Description
GET	/tracks	Get all tracks
GET	/tracks/:id	Get track by ID
POST	/tracks	Create new track
PUT	/tracks/:id	Update track
PATCH	/tracks/:id	Update specific fields
DELETE	/tracks/:id	Delete track
Playlists
Method	Endpoint	Description
GET	/playlists	Get all playlists
GET	/playlists/:id	Get playlist by ID
POST	/playlists	Create new playlist
PUT	/playlists/:id	Update playlist
PATCH	/playlists/:id	Update specific fields
DELETE	/playlists/:id	Delete playlist
🔍 Query Parameters
Sorting
Resultaten kunnen gesorteerd worden op name:

GET /tracks?sort=asc
GET /tracks?sort=desc
GET /playlists?sort=asc
GET /playlists?sort=desc
asc → oplopend

desc → aflopend

Geen parameter → geen sortering

Get All Values of a Property (Extra Feature)
Je kan alle waarden van één property opvragen:

GET /tracks?getall=name
Response:

["Blinding Lights", "Shape of You", "Lose Yourself"]
Dit werkt ook voor andere properties zoals:

bpm

artists

genres

releaseYear

✅ Validation & Error Handling
Input wordt gevalideerd met Joi

Ongeldige input → 400 Bad Request

Resource niet gevonden → 404 Not Found

Succesvolle creatie → 201 Created

🧪 Testing
Alle endpoints zijn getest met Hoppscotch:

CRUD tracks

CRUD playlists

Query parameters

Validatie en error handling

Een export van de Hoppscotch-collectie is toegevoegd aan de repository.

👤 Author
Naam: Nelson

Opleiding: Programmeren (PGM 2)

School: Arteveldehogeschool