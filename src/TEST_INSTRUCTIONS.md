# 3D Text Editor - Test Instructions

## Overview
This document provides instructions for running the comprehensive test suite for the 3D Text Editor internship project.

## Test Types

### 1. Jest Sanity Tests (`textEdit.tests.tsx`)
**Purpose**: Unit tests for build pipeline integration  
**Location**: `/textEdit.tests.tsx`  
**Framework**: Jest + ts-jest  

#### Running Sanity Tests

```bash
# Method 1: Direct Jest command
npx jest textEdit.tests.tsx

# Method 2: Using npm script
npm run test:sanity

# Method 3: Using the test runner script
npm run test:sanity:runner

# Method 4: Watch mode for development
npm run test:sanity:watch
```

#### Test Coverage
The sanity tests cover:

- **Component Initialization**: Default props, custom props, error handling
- **Text Input Operations**: Typing, backspace, multi-line, special characters
- **Text Case Handling**: Uppercase, lowercase, mixed case
- **Font Selection**: Font changes, validation, error handling
- **Font Size Operations**: Increase/decrease, boundary validation
- **Color Selection**: Hex validation, color changes, palette testing
- **Mode Switching**: 2D/3D toggle, validation
- **Save/Cancel Operations**: Data structure validation, callback testing
- **Special Characters**: Numbers, punctuation, Unicode
- **Multi-line Content**: Long text, empty lines
- **Error Handling**: Invalid inputs, edge cases
- **Negative Test Cases**: Invalid values, null/undefined handling
- **Performance Testing**: Large inputs, rapid operations
- **Integration Scenarios**: Complete workflows, error recovery

#### Expected Output
```
✅ Component Initialization (4 tests)
✅ Text Input Operations (6 tests)  
✅ Text Case Handling (5 tests)
✅ Font Selection Operations (4 tests)
✅ Font Size Operations (4 tests)
✅ Color Selection Operations (4 tests)
✅ Mode Switching Operations (4 tests)
✅ Save and Cancel Operations (4 tests)
✅ Special Characters and Input Validation (5 tests)
✅ Multi-line and Long Content (4 tests)
✅ Error Handling and Edge Cases (4 tests)
✅ Negative Test Cases (5 tests)
✅ Performance and Stress Testing (4 tests)
✅ Integration Test Scenarios (2 tests)

Tests: 59 passed, 59 total
```

### 2. Playwright E2E Tests (`/e2e/textEditor.spec.ts`)
**Purpose**: End-to-end testing on Chromium and WebKit  
**Location**: `/e2e/textEditor.spec.ts`  

#### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=webkit
```

## Build Pipeline Integration

### For CI/CD Integration
Add this to your build pipeline:

```yaml
# Example GitHub Actions
- name: Run Sanity Tests
  run: npm run test:sanity

- name: Run E2E Tests  
  run: npm run test:e2e
```

### Jenkins Integration
```groovy
stage('Unit Tests') {
    steps {
        sh 'npm run test:sanity'
    }
}
```

### Test Results
- Jest generates JUnit XML reports for CI integration
- Playwright generates HTML reports with screenshots
- Both test suites provide detailed coverage reports

## Troubleshooting

### Common Issues

#### 1. Jest Tests Failing
```bash
Error: Cannot find module '@react-three/fiber'
```
**Solution**: Install missing dependencies
```bash
npm install
```

#### 2. TypeScript Errors
```bash
Error: Cannot resolve type definitions
```
**Solution**: Install type definitions
```bash
npm install --save-dev @types/jest @types/react
```

#### 3. Mock Issues
```bash
Error: useThree is not a function
```
**Solution**: Mocks are properly configured in the test file

#### 4. Playwright Browser Issues
```bash
Error: Browser not found
```
**Solution**: Install Playwright browsers
```bash
npx playwright install
```

### Test Environment Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**
   ```bash
   npx playwright install chromium webkit
   ```

3. **Verify Installation**
   ```bash
   npm run test:sanity
   npm run test:e2e
   ```

## Test Requirements Met

✅ **Font Selection Testing**: Dropdown functionality, font changes  
✅ **Text Size Testing**: Increase/decrease, boundary validation  
✅ **Typing/Erasing**: Character input, backspace operations  
✅ **Case Handling**: Uppercase, lowercase, mixed case  
✅ **Save/Cancel Testing**: Data persistence, state restoration  
✅ **Multi-line Support**: Enter key, text wrapping  
✅ **Special Characters**: Numbers, punctuation, symbols  
✅ **Mode Switching**: 2D/3D toggle functionality  
✅ **Color Selection**: Color picker, hex validation  
✅ **Error Handling**: Invalid inputs, edge cases  
✅ **Cross-browser Testing**: Chromium and WebKit support  
✅ **Build Pipeline Ready**: Jest integration, CI/CD compatible  

## Performance Benchmarks

- **Test Execution Time**: < 30 seconds for full suite
- **Memory Usage**: < 512MB during test execution  
- **Browser Compatibility**: Chromium 90+, WebKit 14+
- **Node.js Compatibility**: Node 16+

## Coverage Reports

Generate coverage reports:
```bash
npm run test:sanity -- --coverage
```

View coverage in `coverage/lcov-report/index.html`

## Continuous Integration

The test suite is designed for:
- ✅ GitHub Actions
- ✅ Jenkins  
- ✅ GitLab CI
- ✅ Azure DevOps
- ✅ CircleCI

All tests pass in headless mode and generate machine-readable reports for build pipeline integration.