#!/usr/bin/env node

/**
 * Simple test runner for sanity tests
 * Usage: node run-sanity-tests.js
 * Or: npm run test:sanity
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running 3D Text Editor Sanity Tests...\n');

try {
  // Run Jest with specific configuration
  const command = 'npx jest textEdit.tests.tsx --config jest.config.simple.js --verbose';
  
  console.log(`Executing: ${command}\n`);
  
  const output = execSync(command, {
    cwd: process.cwd(),
    stdio: 'inherit',
    encoding: 'utf8'
  });
  
  console.log('\n✅ All sanity tests completed successfully!');
  console.log('📈 Tests are ready for build pipeline integration.');
  
} catch (error) {
  console.error('\n❌ Sanity tests failed!');
  console.error('Error details:', error.message);
  
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Make sure all dependencies are installed: npm install');
  console.log('2. Check that Jest and ts-jest are properly configured');
  console.log('3. Verify that the textEdit.tests.tsx file exists');
  console.log('4. Run: npx jest --init to regenerate Jest config if needed');
  
  process.exit(1);
}