# 🔧 DATABASE SETUP INSTRUCTIONS

## URGENT: Replace Database Password

Your application is failing because the database password is not set correctly.

### What you need to do RIGHT NOW:

1. **Open the file:** `server\.env`

2. **Find this line:**
   ```
   MONGODB_URI=mongodb+srv://arulventhangm23eie:YOURPASSWORD@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
   ```

3. **Replace `YOURPASSWORD` with your actual MongoDB Atlas password**
   
   For example, if your password is `MySecret123`, change it to:
   ```
   MONGODB_URI=mongodb+srv://arulventhangm23eie:MySecret123@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
   ```

4. **Save the file**

5. **Restart your server**

### How to find your MongoDB Atlas password:

1. Go to https://cloud.mongodb.com/
2. Sign in to your account
3. Go to "Database Access" in the left sidebar
4. Find your user `arulventhangm23eie`
5. If you forgot the password, click "Edit" and reset it
6. Copy the new password and use it in the .env file

### After updating the password:

```bash
cd server
npm run dev
```

The server should now connect successfully and show:
✅ Connected to MongoDB successfully

---

**IMPORTANT:** Never commit your real password to git! The .env file is already in .gitignore to protect it.
