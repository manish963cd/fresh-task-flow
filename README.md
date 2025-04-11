
# Todo Application

A full-stack Todo application with React frontend and Node.js/Express/MongoDB backend.

## Features

- Create, read, update, and delete todos
- Rich text editing for todo descriptions
- Real-time database updates when edits are made
- Pagination for todo list
- Search functionality
- Mobile-responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Responsive layout

### Backend
- Node.js with Express
- MongoDB for data storage
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Setup

#### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start server (development mode)
npm run dev

# For production
npm start
```

### Environment Variables

Create a `.env` file in the server directory with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
```

For production, you'll want to use a MongoDB Atlas URI or other MongoDB host.

## API Endpoints

- `GET /api/todos` - Get todos with pagination
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Deployment

### Frontend
Build the frontend:

```bash
npm run build
```

### Backend
For production, set the NODE_ENV environment variable to "production":

```bash
NODE_ENV=production npm start
```

This will serve the frontend build files from the server as well.
