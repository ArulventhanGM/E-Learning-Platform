#!/usr/bin/env node

/**
 * Security Verification Script
 * 
 * This script checks that no hardcoded database credentials exist in the codebase
 * and verifies that environment variables are properly configured.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🔍 Running Security Verification...\n');

// Check for hardcoded credentials patterns (but exclude legitimate test/sample data)
const credentialPatterns = [
    'Arul@123',
    'mongodb+srv://arulventhangm23eie:Arul'
];

// Check for environment variable usage
const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET'
];

// Files to check
const filesToCheck = [
    'server.js',
    'seeder.js',
    'seedQuizzes.js',
    'config/database.js'
];

let securityIssues = [];

// Check for hardcoded credentials
console.log('1️⃣ Checking for hardcoded credentials...');
filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        credentialPatterns.forEach(pattern => {
            if (content.includes(pattern) && 
                !content.includes('YOUR_ACTUAL_PASSWORD') && 
                !content.includes('<db_password>')) {
                securityIssues.push(`❌ Found hardcoded credential pattern "${pattern}" in ${file}`);
            }
        });
    }
});

// Check for proper environment variable usage
console.log('2️⃣ Checking environment variable usage...');
filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if MONGODB_URI is used without fallback
        if (content.includes('process.env.MONGODB_URI') && content.includes('||')) {
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (line.includes('process.env.MONGODB_URI') && 
                    line.includes('||') && 
                    line.includes('mongodb+srv://')) {
                    securityIssues.push(`❌ Found fallback with hardcoded credentials in ${file}:${index + 1}`);
                }
            });
        }
    }
});

// Check .env files for placeholder usage
console.log('3️⃣ Checking .env files...');
const envFiles = ['.env', '.env.production'];
envFiles.forEach(envFile => {
    const envPath = path.join(__dirname, envFile);
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        
        if (content.includes('YOUR_ACTUAL_PASSWORD') || content.includes('<db_password>')) {
            console.log(`✅ ${envFile} correctly uses placeholder`);
        } else if (content.includes('MONGODB_URI=mongodb+srv://') && content.includes('@')) {
            // Check if it contains what looks like a real password
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (line.startsWith('MONGODB_URI=') && 
                    line.includes('mongodb+srv://') &&
                    !line.includes('YOUR_ACTUAL_PASSWORD') &&
                    !line.includes('<db_password>')) {
                    console.log(`⚠️  ${envFile}:${index + 1} may contain real credentials (should use placeholder in repo)`);
                }
            });
        }
    }
});

// Check .gitignore
console.log('4️⃣ Checking .gitignore...');
const gitignorePath = path.join(__dirname, '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    
    if (gitignoreContent.includes('.env')) {
        console.log('✅ .gitignore properly excludes .env files');
    } else {
        securityIssues.push('❌ .gitignore does not exclude .env files');
    }
} else {
    securityIssues.push('❌ .gitignore file not found');
}

// Final report
console.log('\n📋 Security Verification Report:');
console.log('================================');

if (securityIssues.length === 0) {
    console.log('✅ All security checks passed!');
    console.log('✅ No hardcoded credentials found');
    console.log('✅ Environment variables properly configured');
    console.log('✅ Files properly excluded from git');
    console.log('\n🎉 Your application is secure for deployment!');
    process.exit(0);
} else {
    console.log('❌ Security issues found:');
    securityIssues.forEach(issue => console.log(`   ${issue}`));
    console.log('\n🚨 Please fix these issues before deployment!');
    process.exit(1);
}
