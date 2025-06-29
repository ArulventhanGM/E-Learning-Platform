#!/usr/bin/env node

/**
 * Quick MongoDB Connection Test - Simplified Version
 * This tests the exact same connection logic that will be used in production
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('🎉 Your database connection is working perfectly!');
    
    // Test a simple operation
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    console.log('🏠 Connected to host:', mongoose.connection.host);
    
    await mongoose.connection.close();
    console.log('🔌 Test connection closed');
    process.exit(0);
    
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    
    // Check if it's an environment variable issue
    if (!process.env.MONGODB_URI) {
      console.error('🚨 MONGODB_URI environment variable is not set!');
      console.error('Make sure to set it in your .env file or Render environment variables.');
    }
    
    // Check if it's a common authentication issue
    if (err.message.includes('authentication failed')) {
      console.error('🔐 Authentication failed - check your username/password in MONGODB_URI');
    }
    
    // Check if it's a network issue
    if (err.message.includes('ENOTFOUND') || err.message.includes('connect')) {
      console.error('🌐 Network issue - check your internet connection and MongoDB Atlas network access');
    }
    
    process.exit(1);
  }
};

console.log('🧪 Testing MongoDB connection with simplified code...');
console.log('📍 Environment:', process.env.NODE_ENV || 'development');

connectDB();
