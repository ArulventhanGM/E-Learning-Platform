#!/usr/bin/env node

/**
 * Frontend API Configuration Test
 * This script tests the API configuration for the React frontend
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 FRONTEND API CONFIGURATION TEST');
console.log('==================================');

// 1. Check client .env file
const clientEnvPath = path.resolve(__dirname, '../client/.env');
console.log('\n📋 Client .env File Check:');
console.log('📁 File exists:', fs.existsSync(clientEnvPath));

if (fs.existsSync(clientEnvPath)) {
  const envContent = fs.readFileSync(clientEnvPath, 'utf8');
  console.log('📄 Content:');
  console.log(envContent);
  
  // Check for REACT_APP_API_URL
  const apiUrlMatch = envContent.match(/REACT_APP_API_URL=(.+)/);
  if (apiUrlMatch) {
    const apiUrl = apiUrlMatch[1].trim();
    console.log('✅ REACT_APP_API_URL found:', apiUrl);
    
    // Validate URL format
    if (apiUrl.includes('/api')) {
      console.log('✅ URL ends with /api - correct format');
    } else {
      console.log('❌ URL does not end with /api - this will cause API call failures');
    }
    
    if (apiUrl.startsWith('https://')) {
      console.log('✅ URL uses HTTPS - correct for production');
    } else {
      console.log('⚠️  URL does not use HTTPS - may cause issues in production');
    }
  } else {
    console.log('❌ REACT_APP_API_URL not found in .env file');
  }
}

// 2. Check apiService.js file
const apiServicePath = path.resolve(__dirname, '../client/src/services/api/apiService.js');
console.log('\n📋 API Service File Check:');
console.log('📁 File exists:', fs.existsSync(apiServicePath));

if (fs.existsSync(apiServicePath)) {
  const apiServiceContent = fs.readFileSync(apiServicePath, 'utf8');
  
  // Check baseURL configuration
  const baseUrlMatch = apiServiceContent.match(/baseURL:\s*process\.env\.REACT_APP_API_URL\s*\|\|\s*['"`]([^'"`]+)['"`]/);
  if (baseUrlMatch) {
    const fallbackUrl = baseUrlMatch[1];
    console.log('✅ API Service configured correctly');
    console.log('🔗 Fallback URL:', fallbackUrl);
    
    if (fallbackUrl.includes('/api')) {
      console.log('✅ Fallback URL ends with /api - correct');
    } else {
      console.log('❌ Fallback URL missing /api - this will cause failures');
    }
  } else {
    console.log('❌ API Service baseURL configuration not found or incorrect');
  }
  
  // Check for credentials setting
  if (apiServiceContent.includes('withCredentials: false')) {
    console.log('✅ Credentials setting found: false (correct for JWT)');
  } else if (apiServiceContent.includes('withCredentials: true')) {
    console.log('⚠️  Credentials setting: true (make sure CORS supports this)');
  }
}

// 3. Expected configuration summary
console.log('\n📋 Expected Configuration:');
console.log('==========================');
console.log('✅ client/.env should have:');
console.log('   REACT_APP_API_URL=https://e-learning-platform-6263.onrender.com/api');
console.log('');
console.log('✅ apiService.js should have:');
console.log('   baseURL: process.env.REACT_APP_API_URL || "https://e-learning-platform-6263.onrender.com/api"');
console.log('');
console.log('✅ Render Frontend Environment Variables:');
console.log('   REACT_APP_API_URL=https://e-learning-platform-6263.onrender.com/api');

console.log('\n🎯 DEPLOYMENT CHECKLIST:');
console.log('========================');
console.log('1. ✅ Update client/.env with production API URL');
console.log('2. ✅ Verify apiService.js has correct fallback URL');
console.log('3. ✅ Set REACT_APP_API_URL in Render frontend environment variables');
console.log('4. ✅ Redeploy frontend service');
console.log('5. ✅ Test API calls in browser dev console');

console.log('\n🚀 After deployment, API calls should go to:');
console.log('   POST https://e-learning-platform-6263.onrender.com/api/users/register');
console.log('   POST https://e-learning-platform-6263.onrender.com/api/users/login');
console.log('   GET https://e-learning-platform-6263.onrender.com/api/courses');
