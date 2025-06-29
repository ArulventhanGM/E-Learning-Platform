#!/usr/bin/env node

/**
 * Environment Variables Check Script
 * This script verifies that all required environment variables are set correctly
 * Run this before deployment to ensure everything is configured properly
 */

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('🔍 Environment Variables Check');
console.log('================================');

const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'NODE_ENV',
  'PORT'
];

const optionalVars = [
  'CLIENT_URL'
];

let allGood = true;

// Check required variables
console.log('\n📋 Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName === 'MONGODB_URI' ? 'SET (length: ' + value.length + ')' : 'SET'}`);
    
    // Additional validation for MONGODB_URI
    if (varName === 'MONGODB_URI') {
      if (!value.startsWith('mongodb+srv://')) {
        console.log(`⚠️  ${varName}: Should start with 'mongodb+srv://' for Atlas`);
      }
      if (value.includes('localhost') || value.includes('127.0.0.1')) {
        console.log(`❌ ${varName}: Contains localhost - this won't work in production!`);
        allGood = false;
      }
    }
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allGood = false;
  }
});

// Check optional variables
console.log('\n📋 Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`⚠️  ${varName}: NOT SET (optional)`);
  }
});

// Final verdict
console.log('\n🎯 Final Check:');
if (allGood) {
  console.log('✅ All required environment variables are set correctly!');
  console.log('🚀 Ready for deployment!');
  process.exit(0);
} else {
  console.log('❌ Some required environment variables are missing or incorrect!');
  console.log('🔧 Please fix the issues above before deploying.');
  process.exit(1);
}
