# Task Tracking Backend

A simple Express.js backend for task management with SQLite persistence.

## Setup

```bash
cd backend
npm install
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Health Check
- `GET /health` - Returns `{ status: 'ok' }`

### Tasks

#### Get All Tasks
```
GET /api/tasks
```
Returns all tasks ordered by creation date (newest first).

**Response:**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": 0,
    "created_at": "2024-04-11T10:00:00",
    "updated_at": "2024-04-11T10:00:00"
  }
]
```

#### Get Single Task
```
GET /api/tasks/:id
```

**Response:** Single task object or 404 error

#### Create a Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Required:** `title`
**Optional:** `description`

**Response:** Created task object with id and timestamps (201)

#### Update a Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, cheese",
  "completed": true
}
```

**Note:** Only include fields you want to update. All fields are optional.

**Response:** Updated task object

#### Delete a Task
```
DELETE /api/tasks/:id
```

**Response:** 
```json
{
  "message": "Task deleted successfully",
  "id": 1
}
```

## Database

- **Type:** SQLite
- **File:** `backend/tasks.db` (created automatically)
- **Table:** `tasks`

Schema:
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Error Handling

- Invalid requests return 400 status with error message
- Non-existent resources return 404
- Server errors return 500 with error message

All errors follow this format:
```json
{
  "error": "Error description"
}
```

## Development

For hot-reload during development:
```bash
npm run dev
```

This uses Node's `--watch` flag to restart on file changes.
