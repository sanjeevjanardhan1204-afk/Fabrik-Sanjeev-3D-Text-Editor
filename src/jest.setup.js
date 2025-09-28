// Jest setup file for 3D Text Editor tests

// Mock global objects that might not be available in Node.js test environment
if (typeof global.console === 'undefined') {
  global.console = console;
}

// Mock window object for browser APIs
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
    },
    writable: true,
  });
}

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock WebGL context for Three.js
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Array(4) })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => ({ data: new Array(4) })),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
  }));
}

// Extend Jest matchers
expect.extend({
  toBeValidHexColor(received) {
    const pass = /^#[0-9a-f]{6}$/i.test(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid hex color`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid hex color`,
        pass: false,
      };
    }
  },
});

// Global test utilities
global.testUtils = {
  createMockSaveHandler: () => jest.fn(),
  createMockComponent: (props = {}) => ({
    props,
    render: jest.fn(),
  }),
  waitFor: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
};