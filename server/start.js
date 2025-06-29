#!/usr/bin/env node

/**
 * Production Startup Script
 * This script ensures proper environment variable loading and debugging for production deployments
 */

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file (if it exists)
// In production (Render), environment variables should be set in the dashboard
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

console.log('🚀 Starting E-Learning Platform Server...');
console.log('================================');

// Environment debugging
console.log('📍 Environment:', process.env.NODE_ENV || 'not set');
console.log('🔧 Port:', process.env.PORT || 'not set');
console.log('💾 MongoDB URI exists:', !!process.env.MONGODB_URI);

if (process.env.MONGODB_URI) {
  console.log('💾 MongoDB URI type:', typeof process.env.MONGODB_URI);
  console.log('💾 MongoDB URI starts with mongodb+srv:', process.env.MONGODB_URI.startsWith('mongodb+srv://'));
  
  // Check for localhost (should not be in production)
  if (process.env.MONGODB_URI.includes('localhost') || process.env.MONGODB_URI.includes('127.0.0.1')) {
    console.error('❌ ERROR: MongoDB URI contains localhost! This will not work in production.');
    console.error('❌ Please set the MONGODB_URI environment variable to your MongoDB Atlas connection string.');
    process.exit(1);
  }
} else {
  console.error('❌ ERROR: MONGODB_URI environment variable is not set!');
  console.error('❌ Please set this in your Render dashboard or .env file.');
  process.exit(1);
}

console.log('🔑 JWT Secret exists:', !!process.env.JWT_SECRET);
console.log('🌐 Client URL:', process.env.CLIENT_URL || 'not set');
console.log('================================');

// Start the main server
require('./server.js');
