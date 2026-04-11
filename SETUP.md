# Task Manager with Growing Plant - Setup & Development Guide

## Quick Start

### 1. Start the Backend Server

```bash
cd backend
npm start
```

The server will start on `http://localhost:3000`

### 2. Start the Frontend Dev Server (in a new terminal)

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### 3. Test the Application

1. Open your browser at `http://localhost:5173/`
2. Add some tasks by typing a title and clicking "Add Task"
3. Watch the plant grow as you mark tasks as complete!

## Features

- **Task Management**: Add, edit, delete, and complete tasks
- **3D Growing Plant**: Plant grows based on task completion percentage:
  - 0-20%: Just dirt
  - 20-40%: Main stem appears
  - 40-60%: Branches and leaves
  - 60-80%: More leaves
  - 80-100%: Flowers bloom
- **WebSpatial Integration**: Spatial UI elements with depth and transforms
- **Persistent Storage**: Tasks are saved to SQLite database

## Architecture

### Frontend (React + TypeScript + Vite + WebSpatial)
- **TaskManager** - Main container managing all state and data flow
- **TaskForm** - Input form for new tasks
- **TaskList** - Display of all tasks with completion controls
- **PlantContainer** - 3D plant using WebSpatial Reality component

### Backend (Express + SQLite)
- Express server on port 3000
- RESTful API endpoints for task CRUD operations
- SQLite database for persistence

## API Endpoints

All endpoints are available at `http://localhost:3000/api`:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task (title, description, completed status)
- `DELETE /api/tasks/:id` - Delete task

## WebSpatial Features Used

The task manager uses these WebSpatial capabilities:

1. **Reality Component** - For rendering the 3D plant model
2. **Spatial Entities** - Sphere, Cylinder, Cone primitives for plant parts
3. **Materials** - Color definitions for soil, stems, leaves, flowers
4. **Enable-XR Attributes** - Applied to layout sections for spatial computing

## Development Notes

- The plant's 3D dimensions use meters (m) instead of pixels
- Plant updates reactively when task completion percentage changes
- All styling preserves the existing WebSpatial design system from index.css
- The backend is already fully functional with the README at `/backend/README.md`

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Testing on PICO Emulator

To preview in PICO OS 6 mode:

```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
npm run dev

# Then navigate to:
# http://10.0.2.2:5173/ on PICO emulator
# (Make sure Vite is configured with server: { host: true })
```

## Files Added/Modified

**New Components:**
- `/src/components/PlantContainer.tsx` - 3D plant rendering
- `/src/components/TaskForm.tsx` - Task input form
- `/src/components/TaskList.tsx` - Task display and management
- `/src/components/TaskManager.tsx` - Main container

**Services:**
- `/src/services/taskService.ts` - API integration

**Types:**
- `/src/types/task.ts` - TypeScript interfaces

**Modified:**
- `/src/App.tsx` - Now uses TaskManager
- `/src/App.css` - Added task manager styling

## Troubleshooting

**Backend won't connect:**
- Ensure backend is running on port 3000
- Check that `/backend/tasks.db` was created
- Look for errors in backend console

**Plant not showing:**
- Verify React is rendering (check browser console for errors)
- Check that @webspatial/react-sdk is properly installed
- Ensure no CSS conflicts are hiding the plant container

**Tasks not persisting:**
- Verify backend is running
- Check API responses in browser Network tab
- Ensure SQLite database has write permissions
