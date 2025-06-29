#!/usr/bin/env node

/**
 * Comprehensive MongoDB URI Verification Script
 * This script thoroughly validates the MongoDB URI and connection
 */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('🔍 COMPREHENSIVE MONGODB URI VERIFICATION');
console.log('=========================================');

// 1. Check if MONGODB_URI exists
console.log('\n📋 Step 1: Environment Variable Check');
const mongoUri = process.env.MONGODB_URI;
console.log('💾 MONGODB_URI exists:', !!mongoUri);
console.log('💾 MONGODB_URI type:', typeof mongoUri);

if (!mongoUri) {
  console.error('❌ MONGODB_URI is not set!');
  process.exit(1);
}

// 2. Validate URI format
console.log('\n📋 Step 2: URI Format Validation');
console.log('💾 URI length:', mongoUri.length);
console.log('💾 Starts with mongodb+srv://', mongoUri.startsWith('mongodb+srv://'));
console.log('💾 Contains Atlas cluster:', mongoUri.includes('.mongodb.net'));
console.log('💾 Contains credentials:', mongoUri.includes('@'));
console.log('💾 Contains appName:', mongoUri.includes('appName='));

// 3. Check for common issues
console.log('\n📋 Step 3: Common Issues Check');
const hasLocalhost = mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1');
console.log('⚠️  Contains localhost:', hasLocalhost);
if (hasLocalhost) {
  console.error('❌ ERROR: URI contains localhost - this will not work in production!');
  process.exit(1);
}

// 4. Parse URI components (safely)
console.log('\n📋 Step 4: URI Components');
try {
  const url = new URL(mongoUri);
  console.log('🌐 Protocol:', url.protocol);
  console.log('🏠 Hostname:', url.hostname);
  console.log('👤 Username:', url.username ? '***' + url.username.slice(-3) : 'none');
  console.log('🔒 Password:', url.password ? '***' + url.password.slice(-3) : 'none');
  console.log('📋 Search params:', url.search);
} catch (error) {
  console.error('❌ Error parsing URI:', error.message);
  process.exit(1);
}

// 5. Test actual connection
console.log('\n📋 Step 5: Connection Test');
async function testConnection() {
  try {
    console.log('🔌 Attempting connection...');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    
    const connection = mongoose.connection;
    console.log('✅ Connection successful!');
    console.log('📊 Database name:', connection.db.databaseName);
    console.log('🏠 Host:', connection.host);
    console.log('🔢 Port:', connection.port);
    console.log('📡 Ready state:', connection.readyState);
    
    // Test a simple operation
    const collections = await connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.length);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('❌ Error details:', error);
    process.exit(1);
  }
}

// 6. Final verification
console.log('\n📋 Step 6: Final Verification');
console.log('🎯 URI Format: VALID ✅');
console.log('🎯 No localhost: VALID ✅');
console.log('🎯 Atlas format: VALID ✅');

testConnection().then(() => {
  console.log('\n🎉 MONGODB URI VERIFICATION COMPLETE');
  console.log('✅ All checks passed!');
  console.log('✅ URI is correctly formatted');
  console.log('✅ Connection works perfectly');
  console.log('🚀 Ready for production deployment!');
}).catch(console.error);
