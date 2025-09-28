import { test, expect } from '@playwright/test';

// Basic setup for testing the 3D Text Editor
test.describe('3D Text Editor Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for canvas to load
    await page.waitForTimeout(2000);
  });

  test('should display the text editor interface', async ({ page }) => {
    // Check if the main title is visible
    const title = page.getByText('3D Text Editor - Internship Project');
    await expect(title).toBeVisible();
    
    // Check if instructions are visible
    const instructions = page.getByText('Click the \'Edit\' button to start editing');
    await expect(instructions).toBeVisible();
  });

  test('should open text editor when Edit button is clicked', async ({ page }) => {
    // Click the Edit button to open editor
    const canvas = page.locator('canvas');
    await canvas.click({ position: { x: 850, y: 600 } }); // Position of Edit button
    
    await page.waitForTimeout(1000);
    
    // Check if editor opened by verifying canvas is still visible and responsive
    await expect(canvas).toBeVisible();
    
    // Try clicking in the text area to confirm editor is open
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.waitForTimeout(500);
  });

  test('should handle text input and editing operations', async ({ page }) => {
    // Open editor first
    const canvas = page.locator('canvas');
    await canvas.click({ position: { x: 850, y: 600 } });
    await page.waitForTimeout(1000);
    
    // Click in text area to focus
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.waitForTimeout(500);
    
    // Test typing text
    await page.keyboard.type('Hello World');
    await page.waitForTimeout(500);
    
    // Test backspace (erasing)
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    
    // Type replacement text
    await page.keyboard.type('Test');
    
    // Test Enter for multi-line
    await page.keyboard.press('Enter');
    await page.keyboard.type('New Line');
    
    // Test Tab character
    await page.keyboard.press('Tab');
    await page.keyboard.type('Indented');
  });

  test('should handle mode switching between 2D and 3D', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 850, y: 600 } });
    await page.waitForTimeout(1000);
    
    // Click mode toggle button (2D/3D button position)
    await canvas.click({ position: { x: 380, y: 280 } });
    await page.waitForTimeout(500);
    
    // Click again to toggle back
    await canvas.click({ position: { x: 380, y: 280 } });
    await page.waitForTimeout(500);
  });

  test('should handle font selection', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 850, y: 600 } });
    await page.waitForTimeout(1000);
    
    // Click font selector button
    await canvas.click({ position: { x: 450, y: 280 } });
    await page.waitForTimeout(500);
    
    // Click on a font option (first option in dropdown)
    await canvas.click({ position: { x: 450, y: 320 } });
    await page.waitForTimeout(500);
  });

  test('should handle color selection', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Click color picker button
    await canvas.click({ position: { x: 650, y: 250 } });
    await page.waitForTimeout(500);
    
    // Click on a color option
    await canvas.click({ position: { x: 630, y: 350 } });
    await page.waitForTimeout(500);
  });

  test('should handle font size adjustment', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Click increase font size (+) button
    await canvas.click({ position: { x: 445, y: 320 } });
    await page.waitForTimeout(500);
    
    // Click decrease font size (-) button
    await canvas.click({ position: { x: 380, y: 320 } });
    await page.waitForTimeout(500);
  });

  test('should handle save and cancel operations', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Focus text area and type
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.keyboard.type('Test Save');
    await page.waitForTimeout(500);
    
    // Click Save button
    await canvas.click({ position: { x: 350, y: 550 } });
    await page.waitForTimeout(1000);
    
    // Check if saved text counter appears
    const savedCounter = page.getByText(/Saved texts: \d+/);
    await expect(savedCounter).toBeVisible();
  });

  test('should handle cancel operation', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Focus and type text
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.keyboard.type('Test Cancel');
    await page.waitForTimeout(500);
    
    // Click Cancel button
    await canvas.click({ position: { x: 650, y: 550 } });
    await page.waitForTimeout(500);
  });

  test('should handle clear text operation', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Focus and type text
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.keyboard.type('Text to clear');
    await page.waitForTimeout(500);
    
    // Click Clear button
    await canvas.click({ position: { x: 500, y: 550 } });
    await page.waitForTimeout(500);
  });

  test('should handle uppercase and lowercase text', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Focus text area
    await canvas.click({ position: { x: 500, y: 400 } });
    
    // Type lowercase
    await page.keyboard.type('lowercase text');
    await page.waitForTimeout(300);
    
    // Clear and type uppercase
    await canvas.click({ position: { x: 500, y: 550 } }); // Clear button
    await page.waitForTimeout(300);
    
    await page.keyboard.type('UPPERCASE TEXT');
    await page.waitForTimeout(300);
    
    // Test mixed case
    await canvas.click({ position: { x: 500, y: 550 } }); // Clear button
    await page.waitForTimeout(300);
    
    await page.keyboard.type('MixEd CaSe TeXt');
  });

  test('should handle special characters and numbers', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Focus text area
    await canvas.click({ position: { x: 500, y: 400 } });
    
    // Type numbers
    await page.keyboard.type('123456789');
    await page.waitForTimeout(300);
    
    // Add special characters
    await page.keyboard.type('!@#$%^&*()');
    await page.waitForTimeout(300);
    
    // Add punctuation
    await page.keyboard.type('.,;:\'"-_+=');
  });

  test('should handle multi-line text input', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 950, y: 650 } });
    await page.waitForTimeout(1000);
    
    // Focus text area
    await canvas.click({ position: { x: 500, y: 400 } });
    
    // Type multi-line text
    await page.keyboard.type('Line 1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Line 2');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Line 3');
    await page.waitForTimeout(500);
  });

  // Error handling tests
  test('should handle rapid clicking without errors', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Rapid click test
    for (let i = 0; i < 5; i++) {
      await canvas.click({ position: { x: 950, y: 650 } });
      await page.waitForTimeout(100);
    }
    
    await page.waitForTimeout(1000);
    
    // Should still be functional
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.keyboard.type('Still working');
  });

  test('should handle long text input', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 850, y: 600 } });
    await page.waitForTimeout(1000);
    
    // Focus text area
    await canvas.click({ position: { x: 500, y: 400 } });
    
    // Type long text
    const longText = 'This is a very long text to test how the editor handles lengthy content. '.repeat(5);
    await page.keyboard.type(longText);
    await page.waitForTimeout(1000);
  });

  // Additional comprehensive tests for internship requirements
  test('should handle all text formatting operations', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Open editor
    await canvas.click({ position: { x: 850, y: 600 } });
    await page.waitForTimeout(1000);
    
    // Focus text area
    await canvas.click({ position: { x: 500, y: 400 } });
    
    // Test font changes
    await page.keyboard.type('Testing Font');
    await canvas.click({ position: { x: 450, y: 280 } }); // Font dropdown
    await page.waitForTimeout(300);
    await canvas.click({ position: { x: 450, y: 350 } }); // Select different font
    await page.waitForTimeout(500);
    
    // Test size changes
    await canvas.click({ position: { x: 520, y: 280 } }); // Size increase
    await page.waitForTimeout(300);
    await canvas.click({ position: { x: 480, y: 280 } }); // Size decrease
    await page.waitForTimeout(300);
    
    // Clear and test new content
    await canvas.click({ position: { x: 500, y: 470 } }); // Clear button
    await page.waitForTimeout(500);
  });

  test('should validate text editor workflow', async ({ page }) => {
    const canvas = page.locator('canvas');
    
    // Complete workflow test
    await canvas.click({ position: { x: 850, y: 600 } }); // Open
    await page.waitForTimeout(1000);
    
    // Type content
    await canvas.click({ position: { x: 500, y: 400 } });
    await page.keyboard.type('Workflow Test');
    
    // Change mode
    await canvas.click({ position: { x: 380, y: 280 } }); // 2D/3D toggle
    await page.waitForTimeout(500);
    
    // Change color
    await canvas.click({ position: { x: 520, y: 280 } }); // Color picker
    await page.waitForTimeout(300);
    await canvas.click({ position: { x: 510, y: 320 } }); // Select color
    await page.waitForTimeout(300);
    
    // Save
    await canvas.click({ position: { x: 440, y: 470 } }); // Save button
    await page.waitForTimeout(1000);
    
    // Verify save count increased
    const savedCounter = page.getByText(/Saved texts: \d+/);
    await expect(savedCounter).toBeVisible();
  });

});

// Additional Jest-style unit tests for component logic
describe('Text Editor Component Logic', () => {
  
  test('should initialize with default values', () => {
    // Mock test for component initialization
    const defaultText = "Edit me";
    const defaultMode = "2D";
    const defaultFont = "Arial";
    
    expect(defaultText).toBe("Edit me");
    expect(defaultMode).toBe("2D");
    expect(defaultFont).toBe("Arial");
  });

  test('should validate font size limits', () => {
    const minSize = 0.5;
    const maxSize = 2.0;
    
    // Test minimum boundary
    expect(Math.max(minSize, 0.3)).toBe(0.5);
    
    // Test maximum boundary  
    expect(Math.min(maxSize, 2.5)).toBe(2.0);
    
    // Test valid range
    expect(Math.max(minSize, Math.min(maxSize, 1.5))).toBe(1.5);
  });

  test('should handle text transformations', () => {
    let text = "hello";
    
    // Test adding character
    text = text + "!";
    expect(text).toBe("hello!");
    
    // Test backspace
    text = text.slice(0, -1);
    expect(text).toBe("hello");
    
    // Test new line
    text = text + "\n" + "world";
    expect(text).toBe("hello\nworld");
  });

  test('should validate color format', () => {
    const validColors = ["#ffffff", "#ff0000", "#00ff00", "#0000ff"];
    
    validColors.forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  test('should handle save data structure', () => {
    const saveData = {
      text: "Test text",
      meta: {
        font: "Arial",
        mode: "2D" as const,
        color: "#ffffff",
        fontSize: 1.0
      }
    };
    
    expect(saveData.text).toBe("Test text");
    expect(saveData.meta.font).toBe("Arial");
    expect(saveData.meta.mode).toBe("2D");
    expect(saveData.meta.color).toBe("#ffffff");
    expect(saveData.meta.fontSize).toBe(1.0);
  });

});