#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 Running 3D Text Editor Tests...\n');

try {
  console.log('📋 Test Configuration:');
  console.log('- Test File: textEdit.tests.tsx');
  console.log('- Config: jest.config.working.js');
  console.log('- Environment: Node.js\n');
  
  console.log('▶️  Starting tests...\n');
  
  execSync('npm run test:sanity', {
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n✅ All tests passed successfully!');
  console.log('🎉 Your test suite is working correctly!');
  
} catch (error) {
  console.log('\n❌ Tests failed. But don\'t worry, here are some quick fixes:\n');
  
  console.log('🔧 Quick Troubleshooting:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Make sure TypeScript is installed: npm install -g typescript');
  console.log('3. Try running directly: npx jest textEdit.tests.tsx --config jest.config.working.js');
  console.log('4. Check if all files exist in the correct locations\n');
  
  console.log('📁 Required files:');
  console.log('✓ textEdit.tests.tsx (test file)');
  console.log('✓ jest.config.working.js (Jest config)');
  console.log('✓ package.json (with updated scripts)');
  console.log('✓ components/TextEditor3D.tsx (component)');
  console.log('✓ utils/fonts.ts (utilities)\n');
  
  process.exit(1);
}