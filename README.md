# Sportz 🏏

A real-time sports application built with Express.js, PostgreSQL, and Drizzle ORM.

## Features

- **Match Management** - Track live sports matches with real-time scores
- **Commentary System** - Store and retrieve match commentary with metadata
- **Type-Safe Database** - Drizzle ORM with PostgreSQL for robust data handling
- **Validation** - Zod schemas for request validation

## Tech Stack

- **Backend:** Express.js
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **Language:** JavaScript (Node.js)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sportz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your PostgreSQL credentials:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/sportz_db
   PORT=8000
   ```

4. **Create the database**
   ```bash
   psql -U postgres -c "CREATE DATABASE sportz_db;"
   ```

5. **Push schema to database**
   ```bash
   npm run db:push
   ```

## Usage

### Start the server
```bash
npm start
```

The server will run on `http://localhost:8000`

### Database Commands

```bash
# Push schema changes to database (development)
npm run db:push

# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (visual database manager)
npm run db:studio
```

## Database Schema

### Matches Table
- Match details (sport, teams, scores)
- Status tracking (scheduled, live, finished)
- Timestamps for start/end times

### Commentary Table
- Match commentary with sequencing
- Event tracking with metadata
- JSONB fields for flexible data storage
- Foreign key relationship with matches (cascade delete)

## Project Structure

```
sportz/
├── src/
│   ├── db/
│   │   ├── schema.js      # Database schema definitions
│   │   └── index.js       # Database connection
│   └── validation/
│       └── matches.js     # Zod validation schemas
├── drizzle/               # Migration files
├── server.js              # Express server
├── drizzle.config.js      # Drizzle configuration
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment template
└── package.json
```

## API Endpoints

*Coming soon - API routes will be implemented next*

## Development

This project uses:
- **Drizzle ORM** for type-safe database queries
- **Zod** for runtime validation
- **PostgreSQL** for reliable data storage

## License

ISC

## Author

Your Name
