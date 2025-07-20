🛠 Technologies Used in Your App
🌐 Frontend (React App)
Technology	Purpose
React.js	JavaScript library for building user interfaces (your whole UI is built with React).
Tailwind CSS	Utility-first CSS framework for fast, responsive, modern styling.
Styled Components	Write CSS directly in your JS files for component-level styling.
Three.js	(Optional) For 3D animated backgrounds in ThreeBackground.
localStorage	Store user data (employees, tasks, etc.) directly in browser storage for persistence.

🚀 Backend (Node.js & Express API)
Technology	Purpose
Node.js	JavaScript runtime for running server-side code.
Express.js	Web framework for creating API routes (like /api/auth/signup).
CORS	Middleware to allow cross-origin requests from React frontend to backend API.
MongoDB	NoSQL database to store employee and task data persistently.
Mongoose	ODM (Object Data Modeling) library for MongoDB – simplifies database operations.
dotenv (recommended)	To manage environment variables securely (like DB URL, API keys).

🔐 Authentication (In Progress)
Technology	Purpose
JWT (JSON Web Token)	(Likely planned) To securely authenticate users between frontend and backend.
bcryptjs	(Likely planned) To hash passwords before saving them to MongoDB for security.

📦 Project Structure
Folder/File	What it contains
/frontend/src	React components like AdminDashboard, EmployeeDashboard, TaskList, etc.
/backend/server.js	Node.js + Express server entry point.
/backend/routes/auth.js	API routes for user signup and login.
/backend/models/User.js	Mongoose model for users/employees.

🖥️ Dev Tools
Tool	Purpose
VS Code	(Editor) Writing and managing your code.
Postman	(Optional) Test API endpoints during backend development.
MongoDB Compass	GUI for viewing and managing MongoDB data locally.
Browser DevTools	Inspect frontend performance, localStorage data, and API calls.