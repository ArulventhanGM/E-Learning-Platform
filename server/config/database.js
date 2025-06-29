const mongoose = require('mongoose');

/**
 * Database connection utility
 * Handles MongoDB Atlas connection with proper error handling
 */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('✅ MongoDB Atlas connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
