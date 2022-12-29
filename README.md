# Pokemon Roster Builder

A simple web app that lets users build Pokemon teams (aka rosters).

Live demo: https://pokemon-roster-builder.up.railway.app/

![image](https://user-images.githubusercontent.com/18186677/209906323-de8c8a01-a611-4b2b-9abb-997ea7451e32.png)

## Stack

- Next.js (TypeScript)
- Prisma
- MySQL
- Tailwind CSS

## Integration with Poke API

The app itself doesn't store any specific pokemon data. It only stores 2 things:

- The user's roster
- The Pokemon IDs under each roster

The app invokes [Poke API](https://pokeapi.co/docs/v2#pokemon-section) to retrieve additional Pokemon data.

- `https://pokeapi.co/api/v2/pokemon/${pokemonId}` - retrieves data for a specific pokemon. The app extracts the following properties:

  - Pokemon Name
  - Type 1
  - Type 2
  - Sprite URL (hosted in Poke API's file server)

- `https://pokeapi.co/api/v2/pokemon/?limit=1000` - retrieves a list of all Pokemon. Used to verify if the user's input pokemon name is an existing one.

## Backend API

Aside from the frontend UI, the app exposes a backend API for the basic CRUD operations.

### Roster

Represents a roster resource.

Response data structure:

```ts
{
    "id": number,
    "description": string
}
```

- GET `/api/roster/{id}` - retrieves a single roster
- GET `/api/roster/` - retrieves all rosters
- POST `/api/roster/` - create a new roster

  ```json
  {
    "description": "Johto Roster"
  }
  ```

- PUT `/api/roster/{id}` - update an existing roster

  ```json
  {
    "description": "Sinnoh Roster"
  }
  ```

- DELETE `/api/roster/{id}` - delete an existing roster

### Roster Pokemon

Represents a pokemon resource under a roser.

Response data structure:

```ts
{
    "rosterId": number,
    "pokemonId": number // must be a valid pokemon id in the Poke API database
}
```

- GET `/api/roster/{id}/pokemon/{pokemonId}/` - retrieves a single pokemon from a roster
- GET `/api/roster/{id}/pokemon/` - retrieves all pokemon of a roster
- POST `/api/roster/{id}/pokemon/` - adds a new pokemon for a roster

  ```json
  {
    "pokemonId": 1 // must be a valid pokemon id in the Poke API database
  }
  ```

- DELETE `/api/roster/{id}/pokemon/{pokemonId}` - delete a pokemon from a roster

Note: Update via PUT wasn't implemented since it is essentially the same as invoking DELETE then POST.

## Installation and Setup

1. Clone the repository
2. Initialize npm

```bash
npm install
```

3. Create .env with a single variable `DATABASE_URL` and set the MySQL database connection string
4. If connecting to a new database, migrate the prisma schema

```bash
npx prisma db push
```

5. If using VS Code, simply start the debugger for the configuration "Next.js: debug full stack"

6. If not, run the dev server and application should be accessible from http://localhost:3000/

```bash
npm run dev
```

## Future Improvements

- Add an authentication layer so different users can have different rosters
- Add more pokemon information
- Refactor UI into components
- Refactor Tailwind classes
