# E-Learning Platform - Server

Node.js backend API for the E-Learning Platform.

## 🚀 Deployment on Render

### Steps to deploy on Render:

1. **Create a Web Service on Render**
   - Connect your GitHub repository
   - Set the build command: `npm install`
   - Set the start command: `npm start`
   - Set the root directory: `server`

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://arulventhangm23eie:YOUR_ACTUAL_PASSWORD@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CLIENT_URL=https://your-client-app.onrender.com
   ```

3. **Database Setup**
   - Your MongoDB Atlas cluster is already configured: `ELearningPlatform`
   - Replace `YOUR_ACTUAL_PASSWORD` with your actual database password
   - The connection string is already configured in the application

## 🔧 Local Development

```bash
cd server
npm install
npm run dev
```

The server will run on http://localhost:5000

## 📁 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (instructor only)
- `PUT /api/courses/:id` - Update course (instructor only)
- `DELETE /api/courses/:id` - Delete course (instructor only)

### Quizzes
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get quiz by ID
- `POST /api/quiz` - Create quiz (instructor only)
- `PUT /api/quiz/:id` - Update quiz (instructor only)
- `DELETE /api/quiz/:id` - Delete quiz (instructor only)

## 📁 Project Structure

```
server/
├── middleware/      # Express middleware
├── models/         # MongoDB models
├── routes/         # API routes
├── server.js       # Main server file
├── package.json    # Dependencies
└── .env           # Environment variables
```
