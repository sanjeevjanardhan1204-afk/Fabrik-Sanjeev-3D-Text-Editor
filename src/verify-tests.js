#!/usr/bin/env node

/**
 * Test verification script
 * Checks if the test environment is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Test Environment...\n');

const checks = [
  {
    name: 'Jest test file exists',
    check: () => fs.existsSync('./textEdit.tests.tsx'),
    fix: 'The textEdit.tests.tsx file should be in the root directory'
  },
  {
    name: 'Jest config exists',
    check: () => fs.existsSync('./jest.config.simple.js'),
    fix: 'Run the setup script to create jest.config.simple.js'
  },
  {
    name: 'Jest setup file exists',
    check: () => fs.existsSync('./jest.setup.js'),
    fix: 'Jest setup file is missing'
  },
  {
    name: 'Package.json has test scripts',
    check: () => {
      try {
        const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        return pkg.scripts && pkg.scripts['test:sanity'];
      } catch (e) {
        return false;
      }
    },
    fix: 'Add test:sanity script to package.json'
  },
  {
    name: 'Component file exists',
    check: () => fs.existsSync('./components/TextEditor3D.tsx'),
    fix: 'TextEditor3D.tsx component is missing'
  },
  {
    name: 'Fonts utility exists',
    check: () => fs.existsSync('./utils/fonts.ts'),
    fix: 'Fonts utility file is missing'
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  const status = passed ? '✅' : '❌';
  console.log(`${index + 1}. ${status} ${check.name}`);
  
  if (!passed) {
    console.log(`   💡 Fix: ${check.fix}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Test environment is ready.');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run test:sanity');
  console.log('2. Run: npm run test:e2e');
  console.log('3. Check test results');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.');
  console.log('\n🔧 Common fixes:');
  console.log('1. Make sure all files are in the correct locations');
  console.log('2. Run: npm install');
  console.log('3. Check file permissions');
}

console.log('\n📁 Expected file structure:');
console.log(`
├── textEdit.tests.tsx          (Jest test file)
├── jest.config.simple.js       (Jest configuration)
├── jest.setup.js              (Jest setup)
├── run-sanity-tests.js        (Test runner)
├── verify-tests.js            (This file)
├── package.json               (Updated scripts)
├── components/
│   └── TextEditor3D.tsx       (Main component)
├── utils/
│   └── fonts.ts              (Font utilities)
└── e2e/
    └── textEditor.spec.ts     (E2E tests)
`);

process.exit(allPassed ? 0 : 1);