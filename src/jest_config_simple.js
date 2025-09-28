module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: [
    '**/*.spec.js',
    '**/*.test.js'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/'
  ],
  
  // Coverage settings (optional)
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Simple setup
  verbose: true,
  
  // No complex transformations needed for these tests
  transform: {},
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json'],
  
  // Don't clear mocks between tests
  clearMocks: false,
  
  // Test timeout
  testTimeout: 10000
};