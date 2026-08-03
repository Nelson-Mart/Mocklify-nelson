# 🎶 Mockify API

Mockify is een eenvoudige REST API gebouwd met Node.js en Express.
De API simuleert een deel van de Spotify API en laat toe om tracks, playlists en artists te beheren via CRUD-operaties.

De data wordt opgeslagen in lokale JSON-bestanden, zonder gebruik van een externe database.

---

## 🚀 Technologies

- Node.js
- Express.js
- REST API
- Joi (input validation)
- Jest & Supertest (automated testing)
- Hoppscotch (manual testing)
- JSON (mock data)

---

## ⚙️ Installation

Clone de repository:

```bash
git clone <repository-url>
```

Installeer de dependencies:

```bash
npm install
```

Start de server:

```bash
npm run dev
# of
node index.js
```

De API is beschikbaar op:
`http://localhost:3000`

---

## 📁 Project Structure

```
rest-api/
├── controllers/
│   ├── tracks.controller.js
│   ├── playlists.controller.js
│   └── artists.controller.js
├── hoppscotch/
│   └── playlists_tracks_artists.json
├── models/
│   ├── tracks.json
│   ├── playlists.json
│   └── artists.json
├── routes/
│   ├── tracks.routes.js
│   ├── playlists.routes.js
│   └── artists.routes.js
├── tests/
│   ├── tracks.test.js
│   ├── playlists.test.js
│   └── artists.test.js
├── validation/
│   ├── tracks.schema.js
│   ├── playlists.schema.js
│   └── artists.schema.js
├── index.js
├── package.json
└── README.md
```

---

## 📦 Resources

### 🎵 Tracks
Een track bevat:
- id
- name
- bpm
- durationSeconds
- releaseYear
- artists (array)
- genres (array)
- spotifyUrl

### 📀 Playlists
Een playlist bevat:
- id
- name
- description
- author
- visibility (public / private)
- spotifyUrl

### 🎤 Artists
Een artist bevat:
- id
- firstName
- lastName
- about

---

## 🔗 Endpoints

### Tracks
| Method | Endpoint       | Description             |
|--------|----------------|--------------------------|
| GET    | /tracks        | Get all tracks           |
| GET    | /tracks/:id    | Get track by ID          |
| POST   | /tracks        | Create new track         |
| PUT    | /tracks/:id    | Update track             |
| PATCH  | /tracks/:id    | Update specific fields   |
| DELETE | /tracks/:id    | Delete track             |

### Playlists
| Method | Endpoint         | Description              |
|--------|------------------|---------------------------|
| GET    | /playlists       | Get all playlists         |
| GET    | /playlists/:id   | Get playlist by ID        |
| POST   | /playlists       | Create new playlist       |
| PUT    | /playlists/:id   | Update playlist           |
| PATCH  | /playlists/:id   | Update specific fields    |
| DELETE | /playlists/:id   | Delete playlist           |

### Artists
| Method | Endpoint       | Description              |
|--------|----------------|----------------------------|
| GET    | /artists       | Get all artists            |
| GET    | /artists/:id   | Get artist by ID           |
| POST   | /artists       | Create new artist          |
| PUT    | /artists/:id   | Update artist              |
| PATCH  | /artists/:id   | Update specific fields     |
| DELETE | /artists/:id   | Delete artist              |

---

## 🔍 Query Parameters

### Sorting
Resultaten kunnen gesorteerd worden:

```
GET /tracks?sort=asc
GET /tracks?sort=desc
GET /playlists?sort=asc
GET /playlists?sort=desc
GET /artists?sort=asc
GET /artists?sort=desc
```

- `asc` → oplopend
- `desc` → aflopend
- Geen parameter → geen sortering

Tracks en playlists worden gesorteerd op `name`, artists worden gesorteerd op `firstName`.

### Filtering
Resultaten kunnen ook gefilterd worden, per resource op een ander veld:

```
GET /tracks?genre=value
GET /playlists?author=value
GET /artists?firstName=value
```

- Tracks worden gefilterd op `genre` (zoekt of de opgegeven waarde voorkomt in de `genres` array)
- Playlists worden gefilterd op `author`
- Artists worden gefilterd op `firstName`

De filter is niet hoofdlettergevoelig en zoekt op een gedeeltelijke overeenkomst (contains), niet enkel een exacte match.

### Get All Values of a Property (Extra Feature)
Je kan alle waarden van één property opvragen:

```
GET /tracks?getall=name
```

Response:

```json
["Blinding Lights", "Shape of You", "Lose Yourself"]
```

Dit werkt ook voor andere properties zoals:
- bpm
- artists
- genres
- releaseYear

En ook voor playlists en artists, bijvoorbeeld `?getall=firstName` of `?getall=about`.

---

## ✅ Validation & Error Handling

- Input wordt gevalideerd met Joi
- Ongeldige input → 400 Bad Request
- Resource niet gevonden → 404 Not Found
- Succesvolle creatie → 201 Created

---

## 🧪 Testing

De API wordt getest op twee manieren: automatisch met Jest en handmatig met Hoppscotch.

**Jest & Supertest**

Geautomatiseerde tests, terug te vinden in de `tests/` map:
- `tracks.test.js`
- `playlists.test.js`
- `artists.test.js`

Elk bestand test de volledige CRUD-flow (GET, POST, PUT, PATCH, DELETE) en de 404-afhandeling voor het betreffende endpoint.

Tests uitvoeren:

```bash
npm test
```

**Hoppscotch**

Alle endpoints zijn ook manueel getest met Hoppscotch:
- CRUD tracks
- CRUD playlists
- CRUD artists
- Query parameters (sort, filter, getall)
- Validatie en error handling

Een export van de Hoppscotch-collectie is toegevoegd aan de repository (`hoppscotch/playlists_tracks_artists.json`).

---

## 👤 Author

Naam: Nelson

Opleiding: Programmeren (PGM 2)

School: Arteveldehogeschool