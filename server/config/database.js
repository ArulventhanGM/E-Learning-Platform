const mongoose = require('mongoose');

/**
 * Database connection utility
 * Handles MongoDB Atlas connection with proper error handling
 */

const connectDB = async () => {
  try {
    // Debug: Log environment variables
    console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
    console.log('🔍 MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('🔍 MONGODB_URI starts with mongodb+srv:', process.env.MONGODB_URI?.startsWith('mongodb+srv://'));
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('✅ MongoDB Atlas connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('❌ Full error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
