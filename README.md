# E-Learning Platform

A full-stack e-learning platform built with React and Node.js, designed for deployment on Render.

## 🏗️ Project Structure

```
├── client/          # React frontend
│   ├── src/         # React source code
│   ├── public/      # Static files
│   └── package.json # Client dependencies
├── server/          # Node.js backend
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── middleware/  # Express middleware
│   └── package.json # Server dependencies
├── package.json     # Root workspace configuration
└── README.md        # This file
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm run install-all
   ```

2. **Start development servers**
   ```bash
   npm run dev
   ```
   - Client: http://localhost:3000
   - Server: http://localhost:5000

### Individual Services

**Client only:**
```bash
npm run client
```

**Server only:**
```bash
npm run server
```

## 🌐 Deployment on Render

### 1. Client Deployment (Static Site)
- **Repository**: Connect your GitHub repo
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Environment Variables**:
  ```
  REACT_APP_API_URL=https://your-server-name.onrender.com/api
  REACT_APP_NODE_ENV=production
  ```

### 2. Server Deployment (Web Service)
- **Repository**: Connect your GitHub repo
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  ```
  NODE_ENV=production
  PORT=10000
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning
  JWT_SECRET=your-super-secret-jwt-key
  JWT_EXPIRE=7d
  CLIENT_URL=https://your-client-app.onrender.com
  ```

## 🔧 Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start React development server
- `npm run server` - Start Node.js development server
- `npm run build` - Build React app for production
- `npm run install-all` - Install dependencies for both client and server

## 🛠️ Technologies

### Frontend
- React 18
- React Router DOM
- Bootstrap 5
- FontAwesome
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS

## 📚 Features

- User authentication and authorization
- Course management (CRUD operations)
- Quiz system with results tracking
- Role-based access control (Student, Instructor, Admin)
- Responsive design
- RESTful API architecture

## 📝 API Documentation

See the [CRUD Implementation Guide](./CRUD_IMPLEMENTATION.md) for detailed API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
