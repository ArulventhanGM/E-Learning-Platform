const mongoose = require('mongoose');

/**
 * Database connection utility
 * Handles MongoDB connection with proper error handling and retry logic
 */

const connectDB = async () => {
  try {
    // Connection options for MongoDB
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    // Get MongoDB URI from environment variable (REQUIRED)
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ ERROR: MONGODB_URI environment variable is not set!');
      console.error('Please set MONGODB_URI in your .env file or environment variables.');
      throw new Error('Missing MONGODB_URI environment variable');
    }
    
    console.log(`Connecting to MongoDB...`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.NODE_ENV === 'development') {
      // Enable Mongoose debugging in development
      mongoose.set('debug', true);
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error during MongoDB disconnection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running locally (if using local database)');
    console.log('2. Check your MONGODB_URI environment variable');
    console.log('3. For MongoDB Atlas, ensure your IP is whitelisted');
    console.log('4. Verify your database credentials');
    
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
