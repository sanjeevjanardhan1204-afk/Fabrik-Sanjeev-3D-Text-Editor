# 3D Text Editor - Internship Project

A basic 3D text editor built with React Three Fiber that allows users to create and edit text in both 2D and 3D modes.

## Features

### Task 1: Design Implementation
- ✅ Clean, simple interface suitable for internship level
- ✅ Font selection dropdown with multiple font options
- ✅ 2D/3D mode switching
- ✅ Color picker with preset colors
- ✅ Font size adjustment controls
- ✅ Multi-line text support
- ✅ Text input area with visual feedback
- ✅ Save/Cancel/Clear functionality

### Task 2: Test Cases
- ✅ Comprehensive Playwright tests for Chromium and WebKit
- ✅ Tests for all major features:
  - Font selection and switching
  - Text size adjustment
  - Typing and erasing text
  - Uppercase/lowercase handling
  - Save/cancel operations
  - Multi-line text input
  - Error handling scenarios

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

### Unit Tests
Run Jest tests:
```bash
npm test
```

### End-to-End Tests
Run Playwright tests on Chromium and WebKit:
```bash
npm run test:e2e
```

Run tests with UI mode:
```bash
npm run test:e2e:ui
```

## How to Use

1. Click the blue "T" button in the bottom-right corner to open the text editor
2. Click in the text area to start typing
3. Use the controls to:
   - Switch between 2D and 3D modes
   - Change fonts using the dropdown
   - Pick colors from the color palette
   - Adjust font size with +/- buttons
4. Save your text or cancel to discard changes
5. Use Clear button to remove all text

## Project Structure

```
├── App.tsx                 # Main application component
├── components/
│   └── TextEditor3D.tsx    # 3D text editor component
├── utils/
│   └── fonts.ts           # Font configuration
├── textEdit.test.tsx       # Test cases
├── playwright.config.ts    # Playwright configuration
└── package.json           # Dependencies and scripts
```

## Technical Details

- Built with React Three Fiber for 3D rendering
- Canvas-based text rendering (not HTML)
- Supports keyboard, touch, and pointer input
- Responsive design that adapts to screen size
- Font files should be placed in `/public/fonts/` directory

## Test Coverage

The test suite covers:
- ✅ Interface rendering and visibility
- ✅ Text input and editing operations
- ✅ Font selection and mode switching
- ✅ Color and size adjustments
- ✅ Save/cancel/clear operations
- ✅ Multi-line text handling
- ✅ Special characters and numbers
- ✅ Error scenarios and edge cases

## Notes for Internship

This project is designed to be basic and straightforward, suitable for an internship environment. The code prioritizes:
- Simple, readable implementation
- Basic UI design without over-engineering
- Comprehensive test coverage
- Clear documentation
- Standard development practices

The tests can be run as part of a CI/CD pipeline using `npx playwright test` for automated testing during deployment.