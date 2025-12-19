# Terri Quintel Astrology - Assessment Project

> ⚠️ **IMPORTANT: DO NOT USE AI TOOLS**
> 
> **This assessment must be completed WITHOUT using AI tools such as Cursor, ChatGPT, GitHub Copilot, or any other AI coding assistants.**
> 
> **If you use AI tools to complete this assessment, you will FAIL.**
> 
> This assessment is designed to evaluate your personal coding skills, problem-solving abilities, and understanding of Angular and TypeScript. Using AI tools defeats the purpose of this assessment and will result in immediate disqualification.

This is an assessment project for Senior Software Engineer candidates. The project consists of a Node.js backend (mostly complete) and an Angular frontend with two tasks to complete.

## Project Structure

```
.
├── backend/          # Node.js/Express API (mostly complete)
├── frontend/         # Angular application with Vite (tasks to complete)
└── README.md         # This file
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies (includes Socket.io):
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/terri-quintel-astrology
```

5. Seed the database with sample data (optional):
```bash
npm run seed
```

6. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (includes socket.io-client):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:4200`

## API Endpoints

The backend provides the following endpoints:

### Core Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/charts` - Get all astrological charts (supports pagination, filtering, sorting)
- `GET /api/charts/:id` - Get a specific chart by ID
- `POST /api/charts/calculate` - Calculate a new birth chart
- `PUT /api/charts/:id` - Update a chart
- `DELETE /api/charts/:id` - Delete a chart

### Additional Endpoints
- `GET /api/charts/sign/:sign` - Get charts filtered by sun sign
- `GET /api/charts/stats/summary` - Get statistics about charts
- `GET /api/chat` - Get chat messages (with room filtering)
- `POST /api/chat` - Create a chat message
- `GET /api/chat/rooms` - Get list of chat rooms

### Query Parameters (for GET /api/charts)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sunSign` - Filter by sun sign
- `isPublic` - Filter by public/private (true/false)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order: asc/desc (default: desc)

## Real-Time Features with Socket.io

The project requires Socket.io implementation as part of the assessment tasks. This demonstrates:
- Real-time communication capabilities
- Socket.io integration with Angular
- Social & SaaS platform features

**Note:** Socket.io is integrated into both Task 1 and Task 2. See component files for detailed requirements.

## Assessment Tasks

> **📝 IMPORTANT:** Detailed assessment instructions with all requirements are included as comments in each component file. Please read the comments in the component files for complete task details.

### Task 1: Display Astrological Charts with Real-Time Updates

**Location:** `frontend/src/app/task1/task1.component.ts`

**Quick Overview:**
- Fetch and display charts from API (show: name, location, sun sign, moon sign)
- **Implement Socket.io to receive real-time updates when new charts are created**
- Basic error handling

**See the component file for detailed requirements.**

**Expected Time:** 2-3 hours

### Task 2: Birth Chart Calculator with Real-Time Broadcasting

**Location:** `frontend/src/app/task2/task2.component.ts`

**Quick Overview:**
- Create form with 3 fields (Birth Date, Birth Time, Birth Location)
- Submit to API and display results (sun sign, moon sign, rising sign)
- **Implement Socket.io to broadcast new charts after calculation**
- Basic error handling

**See the component file for detailed requirements.**

**Expected Time:** 2-3 hours

## Evaluation Criteria

> ⚠️ **REMINDER: Using AI tools (Cursor, ChatGPT, GitHub Copilot, etc.) will result in immediate failure of this assessment.**

Candidates will be evaluated on:

1. **Functionality**
   - All requirements are met
   - Socket.io integration works correctly
   - Real-time updates function properly
   - Basic error handling

2. **Code Quality**
   - Clean, readable code
   - Proper TypeScript usage
   - Component structure

3. **Best Practices**
   - Proper Socket.io lifecycle (connect/disconnect)
   - Component lifecycle management (OnInit, OnDestroy)
   - Proper use of Angular features

## Submission

> ⚠️ **FINAL WARNING: Do NOT use AI tools. Your submission will be reviewed, and use of AI tools will result in immediate disqualification.**

Please submit your completed assessment by:
1. Pushing your code to a Git repository (GitHub, GitLab, etc.)
2. Sharing the repository link
3. Including a brief summary of your implementation approach

## Backend Architecture

The backend follows a clean MVC architecture:
- **Models**: Mongoose schemas (`models/Chart.js`, `models/Chat.js`)
- **Controllers**: Business logic (`controllers/chartController.js`, `controllers/chatController.js`)
- **Routes**: API endpoints (`routes/chartRoutes.js`, `routes/chatRoutes.js`)
- **Middleware**: Validation and error handling
- **Database**: MongoDB with Mongoose ODM
- **Real-Time**: Socket.io for live chat functionality

## Notes

- ⚠️ **DO NOT USE AI TOOLS** - Using Cursor, ChatGPT, GitHub Copilot, or any AI coding assistants will result in immediate failure
- **Socket.io is REQUIRED** - Both Task 1 and Task 2 must include Socket.io implementation
- The backend uses MongoDB for data persistence - make sure MongoDB is running before starting the server
- Socket.io server is already set up in the backend - you just need to implement the client-side in Angular
- The backend is mostly complete - focus your efforts on the frontend tasks
- A ChatService is provided as a reference for Socket.io usage patterns
- You can use any Angular libraries or styling approaches you prefer (CSS, SCSS, Tailwind, etc.)
- The deadline for completion is 1-2 days from when you receive this assessment

## Questions?

If you have any questions about the assessment, please don't hesitate to reach out.

Good luck!

