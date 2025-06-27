#!/usr/bin/env node

/**
 * Quick Database Connection Test
 * Run this to verify your MongoDB connection is working
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...\n');
  
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set!');
    console.error('Please update your .env file with your MongoDB Atlas password.');
    process.exit(1);
  }
  
  if (MONGODB_URI.includes('<db_password>') || MONGODB_URI.includes('YOURPASSWORD')) {
    console.error('❌ Database password placeholder detected!');
    console.error('Please replace the placeholder with your actual MongoDB Atlas password in .env file.');
    console.error('\nFound:', MONGODB_URI);
    process.exit(1);
  }
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('✅ Database connection is working properly');
    console.log('\n🎉 Your backend should now work for signup and login!');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ FAILED: Could not connect to MongoDB Atlas');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n🔧 This looks like a password issue:');
      console.error('1. Check your MongoDB Atlas password');
      console.error('2. Make sure you replaced YOURPASSWORD in .env file');
      console.error('3. Verify the password in MongoDB Atlas dashboard');
    }
    
    if (error.message.includes('IP')) {
      console.error('\n🔧 This might be an IP whitelist issue:');
      console.error('1. Go to MongoDB Atlas dashboard');
      console.error('2. Go to Network Access');
      console.error('3. Add your current IP or use 0.0.0.0/0 for testing');
    }
    
    process.exit(1);
  }
}

testConnection();
