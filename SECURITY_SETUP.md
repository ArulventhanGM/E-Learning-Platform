# Security Setup Guide

## Environment Variables Security

This project has been configured to **never expose database credentials in source code**. All sensitive information is managed through environment variables.

## ⚠️ IMPORTANT SECURITY RULES

1. **NEVER commit .env files** - They are already in .gitignore
2. **NEVER hardcode database passwords** - Always use environment variables
3. **Always use placeholder values** in example files
4. **Set real credentials only in deployment environments**

## Setting Up Environment Variables

### 1. Development Setup

1. Copy the `.env` file in the `/server` directory
2. Replace `<db_password>` with your real MongoDB Atlas password:

```bash
# Before (placeholder):
MONGODB_URI=mongodb+srv://arulventhangm23eie:<db_password>@elearningplatform.1woyg59.mongodb.net/...

# After (with real password):
MONGODB_URI=mongodb+srv://arulventhangm23eie:YourRealPassword123@elearningplatform.1woyg59.mongodb.net/...
```

### 2. Production Deployment (Render)

Set environment variables in your Render dashboard:

1. Go to your Render service settings
2. Navigate to "Environment" section
3. Add these variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://arulventhangm23eie:YourRealPassword123@elearningplatform.1woyg59.mongodb.net/?retryWrites=true&w=majority&appName=ELearningPlatform
JWT_SECRET=your-super-strong-jwt-secret-for-production
JWT_EXPIRE=7d
CLIENT_URL=https://your-client-app.onrender.com
```

## Security Features Implemented

### ✅ No Hardcoded Credentials
- Removed all fallback database URLs with embedded passwords
- Scripts will fail gracefully if environment variables are missing
- Clear error messages guide users to set required variables

### ✅ Environment Variable Validation
- All database connection scripts validate that `MONGODB_URI` is set
- Applications exit with clear error messages if variables are missing
- No silent fallbacks to insecure defaults

### ✅ Git Security
- `.gitignore` prevents committing sensitive files:
  ```
  # Environment variables
  .env
  .env.local
  .env.development
  .env.production
  .env.test
  ```

## Testing Security

To verify that credentials are properly hidden:

1. **Run the automated security check:**
   ```bash
   cd server
   npm run security-check
   ```

2. **Search for hardcoded passwords manually:**
   ```bash
   # Should return no results:
   grep -r "Arul@123" ./server/
   ```

3. **Test environment variable requirement:**
   ```bash
   # Remove MONGODB_URI temporarily and run seeder:
   cd server
   # This should fail with a clear error message:
   node seeder.js
   ```

4. **Verify .env files are ignored by git:**
   ```bash
   git status
   # .env files should not appear in untracked files
   ```

## Emergency Recovery

If credentials are accidentally committed:

1. **Immediately change your MongoDB password**
2. **Remove the commit from git history:**
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch server/.env' --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push to remove from remote:**
   ```bash
   git push origin --force --all
   ```
4. **Update all deployment environments with new credentials**

## Monitoring

- Regularly audit your environment variables
- Use MongoDB Atlas IP whitelist for additional security
- Monitor database access logs
- Rotate JWT secrets periodically

---

**Remember:** Security is everyone's responsibility. If you notice any hardcoded credentials or security issues, report them immediately.
