# E-Learning Platform - Client

React frontend for the E-Learning Platform.

## 🚀 Deployment on Render

### Steps to deploy on Render:

1. **Create a Static Site on Render**
   - Connect your GitHub repository
   - Set the build command: `npm run build`
   - Set the publish directory: `build`
   - Set the root directory: `client`

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-server-name.onrender.com/api
   REACT_APP_NODE_ENV=production
   ```

3. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `build`
   - Node Version: 18 or higher

## 🔧 Local Development

```bash
cd client
npm install
npm start
```

The app will run on http://localhost:3000

## 📁 Project Structure

```
client/
├── public/          # Static files
├── src/             # React source code
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── contexts/    # React contexts
│   └── assets/      # Static assets
├── package.json     # Dependencies
└── .env            # Environment variables
```
