#!/usr/bin/env node

/**
 * Quick Deploy Test Script
 * This script simulates a Render deployment environment to test our fixes
 */

const dotenv = require('dotenv');
const path = require('path');

// Simulate Render environment
process.env.NODE_ENV = 'production';
process.env.PORT = '10000';

// Load local .env for testing
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('🧪 Simulating Render Deployment Environment');
console.log('============================================');

// Test the production startup
console.log('📝 Testing production startup script...');
try {
  require('./start.js');
} catch (error) {
  console.error('❌ Startup failed:', error.message);
  process.exit(1);
}
