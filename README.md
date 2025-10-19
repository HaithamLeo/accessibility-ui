# ♿ accessibilityUI: React Accessibility Widget

**accessibilityUI** is a React component that brings an advanced accessibility interface to your web app, empowering users with a suite of usability tools.

---

## Installation

Install via your preferred package manager:

```bash
yarn add accessibilityUI
# or
npm install accessibilityUI
```

---

## Usage Example

### Basic Usage (All Widgets Enabled)

```jsx
import AccessibilityUI from "accessibilityUI"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI />
    </div>
  )
}
```

### Selective Widget Configuration

You can selectively enable or disable specific accessibility widgets by passing a `config` prop. By default, all widgets are enabled. Set any widget to `false` to hide it.

```jsx
import AccessibilityUI from "accessibilityUI"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI 
        config={{
          // Content widgets
          adjustFontSize: true,
          dyslexiaFont: true,
          fontWeight: false,  // Hide font weight widget
          textAlignLeft: true,
          textAlignCenter: true,
          textAlignRight: true,
          highlightLinks: true,
          highlightTitles: true,
          letterSpacing: true,
          lineHeight: true,
          wordSpacing: false,  // Hide word spacing widget
          zoom: true,
          
          // Color widgets
          blueLightFilter: true,
          brightness: true,
          darkContrast: true,
          lightContrast: true,
          highContrast: true,
          highSaturation: false,  // Hide high saturation widget
          lowSaturation: false,   // Hide low saturation widget
          monochrome: true,
          textColorPicker: true,
          visualImpairment: true,
          
          // Tool widgets
          bigCursor: true,
          readingGuide: true,
        }}
      />
    </div>
  )
}
```

### TypeScript Support

The library includes TypeScript definitions. You can import the `WidgetConfig` type for better type safety:

```tsx
import AccessibilityUI, { WidgetConfig } from "accessibilityUI"

const config: WidgetConfig = {
  adjustFontSize: true,
  dyslexiaFont: true,
  zoom: true,
  bigCursor: true,
  readingGuide: true,
  // All other widgets will be enabled by default
}

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI config={config} />
    </div>
  )
}
```

---

## Features

### 📝 Text Customization

- **Font Size Adjustment** for improved readability.
- **Font Weight Selection** for lighter or bolder text.
- **Dyslexia-Friendly Font** for easier reading and reduced visual stress.
- **Text Alignment:** Left, right, center, or justified.
- **Highlight Links & Titles** to improve navigation.
- **Letter, Word, and Line Spacing Controls** for enhanced readability.

### 🎨 Color & Contrast Controls

- **Blue Light Filter** to reduce eye strain.
- **Brightness Control** for personalized viewing comfort.
- **Dark & High Contrast Modes** for improved visibility.
- **Saturation Controls** to adjust color vividness.
- **Monochrome/Grayscale Mode** for simplified visuals.
- **Text Color Picker** for custom text colors.
- **Visual Impairment Mode** with enhanced features.

### 🧰 Accessibility Tools

- **Zoom Button** for full-page magnification.
- **Big Cursor** for improved pointer visibility.
- **Reading Guide** to help focus on text lines.

---

## Configuration Options

All widgets are enabled by default. You can selectively disable widgets by passing a `config` prop to the `AccessibilityUI` component. Here are all available configuration options:

### Content Panel Widgets
- `adjustFontSize` - Font size adjustment controls
- `dyslexiaFont` - Dyslexia-friendly font toggle
- `fontWeight` - Font weight selection
- `textAlignLeft` - Left text alignment
- `textAlignCenter` - Center text alignment  
- `textAlignRight` - Right text alignment
- `highlightLinks` - Highlight links feature
- `highlightTitles` - Highlight titles feature
- `letterSpacing` - Letter spacing control
- `lineHeight` - Line height adjustment
- `wordSpacing` - Word spacing control
- `zoom` - Page zoom control

### Color Panel Widgets
- `blueLightFilter` - Blue light filter toggle
- `brightness` - Brightness control
- `darkContrast` - Dark contrast mode
- `lightContrast` - Light contrast mode
- `highContrast` - High contrast control
- `highSaturation` - High saturation control
- `lowSaturation` - Low saturation control
- `monochrome` - Monochrome/grayscale mode
- `textColorPicker` - Custom text color picker
- `visualImpairment` - Visual impairment mode

### Tools Panel Widgets
- `bigCursor` - Big cursor toggle
- `readingGuide` - Reading guide toggle

---

## Quick Start

Install and add to your React project:

```bash
yarn add accessibilityUI
# or
npm install accessibilityUI
```

### All Widgets Enabled (Default)

```jsx
import AccessibilityUI from "accessibilityUI"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI />
    </div>
  )
}
```

### Custom Widget Configuration

```jsx
import AccessibilityUI from "accessibilityUI"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI 
        config={{
          adjustFontSize: true,
          dyslexiaFont: true,
          zoom: true,
          highContrast: true,
          bigCursor: true,
          readingGuide: true,
          // Set any widget to false to hide it
          wordSpacing: false,
          highSaturation: false,
        }}
      />
    </div>
  )
}
```

---

Empower everyone to navigate your site comfortably with accessibilityUI—no setup required.
