/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Test file patterns
  testMatch: [
    '**/textEdit.tests.(ts|tsx)',
    '**/*.(test|spec).(ts|tsx)'
  ],
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Transform files
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        moduleResolution: 'node'
      }
    }],
  },
  
  // Module name mapping for imports
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Verbose output
  verbose: true,
  
  // Timeout for tests
  testTimeout: 15000,
  
  // Handle ES modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  // Globals for ts-jest
  globals: {
    'ts-jest': {
      useESM: true
    }
  },

  // Coverage settings (optional)
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    '!components/ui/**',
    '!**/*.d.ts',
  ],
  
  // Mock specific modules that might cause issues
  moduleNameMapping: {
    '^three$': '<rootDir>/node_modules/three/build/three.min.js',
    '^@react-three/fiber$': '<rootDir>/node_modules/@react-three/fiber/dist/index.js',
    '^@react-three/drei$': '<rootDir>/node_modules/@react-three/drei/dist/index.js'
  }
};

module.exports = config;