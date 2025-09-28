// Font configuration for the 3D text editor
export const availableFonts = [
  "System Default",
  "Arial", 
  "Helvetica",
  "Times",
  "Courier"
];

// For now, we'll use only the default font to ensure stability
// The font selection will be tracked for metadata but won't affect rendering
// This prevents the component from disappearing due to font loading issues
export const fontUrls: Record<string, string | undefined> = {
  "System Default": undefined,
  "Arial": undefined,        // Will fallback to default
  "Helvetica": undefined,    // Will fallback to default
  "Times": undefined,        // Will fallback to default
  "Courier": undefined       // Will fallback to default
};

// Get font URL for a given font name (always returns undefined for stability)
export const getFontUrl = (fontName: string): string | undefined => {
  // Always return undefined to use Three.js default font
  // This ensures the component doesn't crash while still tracking font selection
  return undefined;
};

// Default font fallback
export const defaultFont = "System Default";