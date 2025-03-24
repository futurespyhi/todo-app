# Todo App

A full-stack web application for managing a simple to-do list with user authentication. This application allows users to sign up, log in, create, read, update, and delete tasks.

## Features

- **User Authentication**: Register, login, and session management using JWT
- **Task Management**: Create, read, update, and delete tasks
- **Authorization**: Users can only access their own tasks
- **Responsive Design**: Mobile-friendly UI
- **Form Validation**: Client and server-side validation

## Tech Stack

### Frontend
- **Framework**: React.js
- **State Management**: React Context API (AuthContext, TaskContext)
- **UI Library**: CSS framework (Bootstrap or Material-UI)
- **Routing**: React Router
- **Testing**: Jest for unit tests

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Unit tests for API endpoints

## Project Structure

### Backend
```
backend/
├── config/
│   └── db.js                # Database configuration
├── controllers/             # Route handlers
├── middleware/
│   └── authMiddleware.js    # Authentication middleware
├── models/
│   ├── Task.js              # Task schema
│   └── User.js              # User schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── tasks.js             # Task CRUD routes
├── tests/
│   ├── auth.test.js         # Authentication tests
│   └── tasks.test.js        # Task routes tests
├── .env                     # Environment variables
├── app.js                   # Express app setup
├── package.json             # Project dependencies
└── server.js                # Server entry point
```

### Frontend
```
frontend/
├── public/
├── src/
│   ├── components/          # React components
│   ├── context/
│   │   ├── AuthContext.js   # Authentication context
│   │   └── TaskContext.js   # Task management context
│   ├── pages/
│   │   ├── LoginPage.js     # Login page
│   │   ├── SignUpPage.js    # Registration page
│   │   └── TaskListPage.js  # Task dashboard
│   ├── tests/               # Frontend tests
│   ├── api.js               # API integration
│   ├── App.css              # Main styles
│   ├── App.js               # Main component
│   ├── index.js             # React entry point
│   └── setupTests.js        # Test configuration
├── .gitignore
├── package.json             # Frontend dependencies
└── README.md                # Frontend documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/futurespyhi/todo-app.git
   cd todo-app
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret_key
   ```

4. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd backend
   npm run dev
   ```
   This will start the backend server at http://localhost:5000

2. Start the frontend development server
   ```bash
   cd frontend
   npm start
   ```
   This will start the frontend development server at http://localhost:3000

### API Endpoints

#### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user

#### Tasks
- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

The application can be deployed to cloud services like:
- Heroku
- Vercel
- Netlify

Follow these general steps for deployment:
1. Set up environment variables in your deployment platform
2. Configure your MongoDB connection string for production
3. Deploy the backend and frontend separately or as a unified application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
