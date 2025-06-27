# MongoDB Atlas Connection Setup Guide

## 🔧 **Setup Instructions**

### **1. Get Your MongoDB Atlas Password**
- Log into your MongoDB Atlas account
- Go to Database Access
- Find your user: `arulventhangm23eie`
- Note down or reset your password

### **2. Update Environment Variables**

**For Development (.env):**
```env
MONGODB_URI=mongodb+srv://arulventhangm23eie:YOUR_ACTUAL_PASSWORD@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
```

**For Production (Render Environment Variables):**
```
MONGODB_URI=mongodb+srv://arulventhangm23eie:YOUR_ACTUAL_PASSWORD@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
```

### **3. Database Configuration Details**
- **Cluster Name**: ELearningPlatform
- **Username**: arulventhangm23eie
- **Database**: Will be created automatically
- **Cluster**: elearningplatform.1woyg59.mongodb.net

### **4. IP Whitelist Configuration**
Make sure to whitelist your IP addresses in MongoDB Atlas:
- For development: Add your current IP
- For production: Add `0.0.0.0/0` (allow all) or Render's IP ranges

### **5. Testing the Connection**
1. Replace `YOUR_ACTUAL_PASSWORD` with your real password in `.env`
2. Run: `npm run dev`
3. Look for: `✅ Connected to MongoDB successfully`

### **6. For Render Deployment**
Set these environment variables in Render:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://arulventhangm23eie:YOUR_ACTUAL_PASSWORD@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-client-app.onrender.com
```

## 🚨 **Important Security Notes**
- Never commit your actual password to Git
- Use strong passwords for production
- Regularly rotate your database credentials
- Use IP whitelisting for additional security

## 🔍 **Troubleshooting**
1. **Authentication Failed**: Check password and username
2. **Connection Timeout**: Check IP whitelist
3. **Network Error**: Verify internet connection and MongoDB Atlas status
