import { test, expect, Page } from '@playwright/test';

// Helper function to wait for canvas to be ready
async function waitForCanvasReady(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Wait for Three.js to initialize
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  return canvas;
}

// Helper function to open the text editor
async function openTextEditor(page: Page) {
  const canvas = await waitForCanvasReady(page);
  // Click the Edit button (positioned on the right side)
  await canvas.click({ position: { x: 750, y: 200 } });
  await page.waitForTimeout(1000);
  return canvas;
}

// Helper function to focus text input area
async function focusTextArea(canvas: any) {
  await canvas.click({ position: { x: 400, y: 400 } });
  await page.waitForTimeout(500);
}

test.describe('3D Text Editor - Comprehensive Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Basic Interface Tests', () => {
    
    test('should display main interface elements', async ({ page }) => {
      // Check main title
      const title = page.getByText('3D Text Editor - Internship Project');
      await expect(title).toBeVisible();
      
      // Check instructions
      const instructions = page.getByText('Click the \'Edit\' button to start editing');
      await expect(instructions).toBeVisible();
      
      // Check canvas is loaded
      const canvas = page.locator('canvas');
      await expect(canvas).toBeVisible();
    });

    test('should open and close text editor', async ({ page }) => {
      const canvas = await waitForCanvasReady(page);
      
      // Open editor
      await canvas.click({ position: { x: 750, y: 200 } });
      await page.waitForTimeout(1000);
      
      // Close editor
      await canvas.click({ position: { x: 750, y: 200 } });
      await page.waitForTimeout(500);
    });

  });

  test.describe('Text Input and Editing', () => {
    
    test('should handle basic text typing', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Focus text area
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      // Clear existing text first
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      
      // Type new text
      await page.keyboard.type('Hello World!');
      await page.waitForTimeout(1000);
    });

    test('should handle text erasing with backspace', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      // Clear and type text
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Delete Me');
      await page.waitForTimeout(500);
      
      // Erase some characters
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(200);
      }
    });

    test('should handle uppercase text input', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('UPPERCASE TEXT');
      await page.waitForTimeout(1000);
    });

    test('should handle lowercase text input', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('lowercase text');
      await page.waitForTimeout(1000);
    });

    test('should handle mixed case text input', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('MiXeD cAsE tExT');
      await page.waitForTimeout(1000);
    });

    test('should handle multi-line text input', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      
      // Type multi-line text
      await page.keyboard.type('Line One');
      await page.keyboard.press('Enter');
      await page.keyboard.type('Line Two');
      await page.keyboard.press('Enter');
      await page.keyboard.type('Line Three');
      await page.waitForTimeout(1000);
    });

    test('should handle special characters and numbers', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      
      // Numbers
      await page.keyboard.type('1234567890');
      await page.keyboard.press('Enter');
      
      // Special characters
      await page.keyboard.type('!@#$%^&*()');
      await page.keyboard.press('Enter');
      
      // Punctuation
      await page.keyboard.type('.,;:\'"_-+=');
      await page.waitForTimeout(1000);
    });

    test('should handle tab character input', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      
      await page.keyboard.type('Start');
      await page.keyboard.press('Tab');
      await page.keyboard.type('Indented Text');
      await page.waitForTimeout(1000);
    });

  });

  test.describe('Font Selection Tests', () => {
    
    test('should open and close font dropdown', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Click font selector to open dropdown
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(500);
      
      // Click elsewhere to close
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
    });

    test('should change font to Arial', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Open font dropdown
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(500);
      
      // Click Arial option
      await canvas.click({ position: { x: 520, y: 280 } });
      await page.waitForTimeout(1000);
    });

    test('should change font to Times', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Open font dropdown
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(500);
      
      // Click Times option
      await canvas.click({ position: { x: 520, y: 330 } });
      await page.waitForTimeout(1000);
    });

    test('should change font to Courier', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Open font dropdown
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(500);
      
      // Click Courier option
      await canvas.click({ position: { x: 520, y: 380 } });
      await page.waitForTimeout(1000);
    });

    test('should test font selection with text', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text first
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Font Test Text');
      await page.waitForTimeout(500);
      
      // Change font
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(500);
      await canvas.click({ position: { x: 520, y: 280 } }); // Arial
      await page.waitForTimeout(1000);
    });

  });

  test.describe('Font Size Tests', () => {
    
    test('should increase font size', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type some text first
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Size Test');
      await page.waitForTimeout(500);
      
      // Increase font size multiple times
      for (let i = 0; i < 3; i++) {
        await canvas.click({ position: { x: 670, y: 230 } }); // + button
        await page.waitForTimeout(300);
      }
    });

    test('should decrease font size', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type some text first
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Size Test');
      await page.waitForTimeout(500);
      
      // Decrease font size multiple times
      for (let i = 0; i < 2; i++) {
        await canvas.click({ position: { x: 620, y: 230 } }); // - button
        await page.waitForTimeout(300);
      }
    });

    test('should test font size boundaries', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Boundary Test');
      await page.waitForTimeout(500);
      
      // Try to go beyond maximum
      for (let i = 0; i < 20; i++) {
        await canvas.click({ position: { x: 670, y: 230 } }); // + button
        await page.waitForTimeout(100);
      }
      
      // Try to go beyond minimum
      for (let i = 0; i < 25; i++) {
        await canvas.click({ position: { x: 620, y: 230 } }); // - button
        await page.waitForTimeout(100);
      }
    });

  });

  test.describe('Color Selection Tests', () => {
    
    test('should open and close color picker', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Open color picker
      await canvas.click({ position: { x: 580, y: 230 } });
      await page.waitForTimeout(500);
      
      // Close by clicking elsewhere
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.waitForTimeout(500);
    });

    test('should change text color to red', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text first
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Red Text');
      await page.waitForTimeout(500);
      
      // Open color picker
      await canvas.click({ position: { x: 580, y: 230 } });
      await page.waitForTimeout(500);
      
      // Click red color
      await canvas.click({ position: { x: 565, y: 280 } });
      await page.waitForTimeout(1000);
    });

    test('should change text color to blue', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Blue Text');
      await page.waitForTimeout(500);
      
      // Open color picker and select blue
      await canvas.click({ position: { x: 580, y: 230 } });
      await page.waitForTimeout(500);
      await canvas.click({ position: { x: 595, y: 280 } });
      await page.waitForTimeout(1000);
    });

    test('should test all color options', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Color Test');
      await page.waitForTimeout(500);
      
      // Test different colors
      const colorPositions = [
        { x: 550, y: 280 }, // white
        { x: 565, y: 280 }, // red
        { x: 580, y: 280 }, // green
        { x: 595, y: 280 }, // blue
      ];
      
      for (const pos of colorPositions) {
        await canvas.click({ position: { x: 580, y: 230 } }); // Open picker
        await page.waitForTimeout(300);
        await canvas.click({ position: pos });
        await page.waitForTimeout(500);
      }
    });

  });

  test.describe('Mode Switching Tests', () => {
    
    test('should switch between 2D and 3D modes', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type some text first
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Mode Test');
      await page.waitForTimeout(500);
      
      // Switch to 3D mode
      await canvas.click({ position: { x: 380, y: 230 } });
      await page.waitForTimeout(1000);
      
      // Switch back to 2D mode
      await canvas.click({ position: { x: 380, y: 230 } });
      await page.waitForTimeout(1000);
    });

    test('should test mode switching with different text', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Start in 2D mode
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('2D Mode Text');
      await page.waitForTimeout(500);
      
      // Switch to 3D
      await canvas.click({ position: { x: 380, y: 230 } });
      await page.waitForTimeout(500);
      
      // Add more text in 3D mode
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Enter');
      await page.keyboard.type('3D Mode Text');
      await page.waitForTimeout(1000);
    });

  });

  test.describe('Save and Cancel Operations', () => {
    
    test('should save text successfully', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Text to Save');
      await page.waitForTimeout(500);
      
      // Click Save button
      await canvas.click({ position: { x: 280, y: 550 } });
      await page.waitForTimeout(1000);
      
      // Check if saved counter appears
      const savedCounter = page.getByText(/Saved texts: \d+/);
      await expect(savedCounter).toBeVisible();
    });

    test('should cancel text editing', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Text to Cancel');
      await page.waitForTimeout(500);
      
      // Click Cancel button
      await canvas.click({ position: { x: 520, y: 550 } });
      await page.waitForTimeout(1000);
    });

    test('should clear text', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Text to Clear');
      await page.waitForTimeout(500);
      
      // Click Clear button
      await canvas.click({ position: { x: 400, y: 550 } });
      await page.waitForTimeout(500);
    });

    test('should test complete save workflow', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Complete workflow: Type, format, and save
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Complete Workflow Test');
      await page.waitForTimeout(500);
      
      // Change font
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(300);
      await canvas.click({ position: { x: 520, y: 280 } });
      await page.waitForTimeout(300);
      
      // Change color
      await canvas.click({ position: { x: 580, y: 230 } });
      await page.waitForTimeout(300);
      await canvas.click({ position: { x: 565, y: 280 } });
      await page.waitForTimeout(300);
      
      // Increase size
      await canvas.click({ position: { x: 670, y: 230 } });
      await page.waitForTimeout(300);
      
      // Switch mode
      await canvas.click({ position: { x: 380, y: 230 } });
      await page.waitForTimeout(300);
      
      // Save
      await canvas.click({ position: { x: 280, y: 550 } });
      await page.waitForTimeout(1000);
      
      // Verify save
      const savedCounter = page.getByText(/Saved texts: \d+/);
      await expect(savedCounter).toBeVisible();
    });

  });

  test.describe('Error Handling and Edge Cases', () => {
    
    test('should handle rapid clicking without errors', async ({ page }) => {
      const canvas = await waitForCanvasReady(page);
      
      // Rapid clicking test
      for (let i = 0; i < 10; i++) {
        await canvas.click({ position: { x: 750, y: 200 } });
        await page.waitForTimeout(100);
      }
      
      await page.waitForTimeout(1000);
      
      // Should still be functional
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.type('Still Working');
      await page.waitForTimeout(500);
    });

    test('should handle empty text save', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Try to save empty text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.waitForTimeout(500);
      
      await canvas.click({ position: { x: 280, y: 550 } }); // Save
      await page.waitForTimeout(1000);
    });

    test('should handle very long text input', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      
      // Type long text
      const longText = 'This is a very long text string that tests the editor capabilities with extensive content. '.repeat(3);
      await page.keyboard.type(longText);
      await page.waitForTimeout(2000);
    });

    test('should handle whitespace-only text', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      
      // Type only spaces and tabs
      await page.keyboard.type('   ');
      await page.keyboard.press('Tab');
      await page.keyboard.type('   ');
      await page.waitForTimeout(500);
      
      // Try to save
      await canvas.click({ position: { x: 280, y: 550 } });
      await page.waitForTimeout(1000);
    });

  });

  test.describe('Complex Workflow Tests', () => {
    
    test('should handle multiple edit sessions', async ({ page }) => {
      const canvas = await waitForCanvasReady(page);
      
      // First session
      await canvas.click({ position: { x: 750, y: 200 } }); // Open
      await page.waitForTimeout(500);
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('First Session');
      await canvas.click({ position: { x: 280, y: 550 } }); // Save
      await page.waitForTimeout(1000);
      
      // Second session
      await canvas.click({ position: { x: 750, y: 200 } }); // Open
      await page.waitForTimeout(500);
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('Second Session');
      await canvas.click({ position: { x: 280, y: 550 } }); // Save
      await page.waitForTimeout(1000);
      
      // Verify multiple saves
      const savedCounter = page.getByText(/Saved texts: \d+/);
      await expect(savedCounter).toBeVisible();
    });

    test('should test all formatting options together', async ({ page }) => {
      const canvas = await openTextEditor(page);
      
      // Type base text
      await canvas.click({ position: { x: 400, y: 400 } });
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      await page.keyboard.type('FORMATTED TEXT');
      await page.waitForTimeout(500);
      
      // Apply all formatting
      // Font
      await canvas.click({ position: { x: 520, y: 230 } });
      await page.waitForTimeout(300);
      await canvas.click({ position: { x: 520, y: 330 } }); // Times
      await page.waitForTimeout(300);
      
      // Color
      await canvas.click({ position: { x: 580, y: 230 } });
      await page.waitForTimeout(300);
      await canvas.click({ position: { x: 595, y: 280 } }); // Blue
      await page.waitForTimeout(300);
      
      // Size (increase)
      await canvas.click({ position: { x: 670, y: 230 } });
      await canvas.click({ position: { x: 670, y: 230 } });
      await page.waitForTimeout(300);
      
      // Mode
      await canvas.click({ position: { x: 380, y: 230 } });
      await page.waitForTimeout(500);
      
      // Save
      await canvas.click({ position: { x: 280, y: 550 } });
      await page.waitForTimeout(1000);
    });

  });

});