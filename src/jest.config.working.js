/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  
  // Only test our specific file
  testMatch: [
    '**/*.test.(ts|tsx|js)',
    '**/*.tests.(ts|tsx|js)'
  ],
  
  // Simple transform for TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      isolatedModules: true,
      tsconfig: {
        jsx: 'react-jsx'
      }
    }],
  },
  
  // Module extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Simple module resolution
  moduleDirectories: ['node_modules', '.'],
  
  // Don't collect coverage to keep it simple
  collectCoverage: false,
  
  // Timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Don't exit on first test failure
  bail: false
};