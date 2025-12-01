# @rihal/accessibility-ui: React Accessibility Widget

**@rihal/accessibility-ui** is a React component that brings an advanced accessibility interface to your web app, empowering users with a suite of usability tools.

---

## Installation

Install via your preferred package manager:

```bash
yarn add @rihal/accessibility-ui
# or
npm install @rihal/accessibility-ui
```

---

## Language Integration with Host Applications

The accessibility widget can integrate seamlessly with your application's i18n system (such as next-intl or i18next). This allows you to control the widget's language from your host application, preventing duplicate language selectors and ensuring a consistent language experience.

### Setting Language from Host Application

You can control the widget's language in three ways:

#### 1. Direct Language Prop

Pass the current language directly as a prop:

```jsx
import AccessibilityUI from "@rihal/accessibility-ui"

export default function App() {
  const currentLang = "ar" // or "en"

  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI language={currentLang} disableLanguageSelector={true} />
    </div>
  )
}
```

#### 2. Language Resolver Callback

Provide a function that returns the current language:

```jsx
import AccessibilityUI from "@rihal/accessibility-ui"
import { useLocale } from "next-intl"

export default function App() {
  const locale = useLocale()

  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI resolveLanguage={() => locale} disableLanguageSelector={true} />
    </div>
  )
}
```

#### 3. Auto-detection from Document

If neither `language` nor `resolveLanguage` is provided, the widget will automatically detect the language from `document.documentElement.lang`:

```jsx
// In your HTML: <html lang="ar">
import AccessibilityUI from "@rihal/accessibility-ui"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI disableLanguageSelector={true} />
    </div>
  )
}
```

### Language Props

- **`language?: string`** - Set the widget language directly (e.g., "en" or "ar")
- **`resolveLanguage?: () => string`** - Callback function that returns the current language
- **`disableLanguageSelector?: boolean`** - When true, hides the language dropdown from the widget UI

### Integration Examples

#### With next-intl

```tsx
import AccessibilityUI from "@rihal/accessibility-ui"
import { useLocale } from "next-intl"

export default function RootLayout({ children }) {
  const locale = useLocale()

  return (
    <html lang={locale}>
      <body>
        {children}
        <AccessibilityUI language={locale} disableLanguageSelector={true} />
      </body>
    </html>
  )
}
```

#### With i18next

```tsx
import AccessibilityUI from "@rihal/accessibility-ui"
import { useTranslation } from "react-i18next"

export default function App() {
  const { i18n } = useTranslation()

  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI language={i18n.language} disableLanguageSelector={true} />
    </div>
  )
}
```

### Supported Languages

Currently, the widget supports:

- English (`en`)
- Arabic (`ar`)

The widget automatically handles RTL (right-to-left) layout for Arabic.

### Backward Compatibility

All language integration props are optional. If you don't provide any language props, the widget will use its built-in language selector and behavior, maintaining full backward compatibility with existing implementations.

---

## Theme Customization

You can customize the theme of the accessibility widget to match your application's branding by passing a `theme` prop:

```jsx
import AccessibilityUI from "@rihal/accessibility-ui"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI
        theme={{
          primaryColor: "#2563eb", // Blue
          highlightColor: "#3b82f6", // Lighter blue
          backgroundColor: "#f0f9ff", // Light blue background
          textColor: "#1e293b", // Dark slate
        }}
      />
    </div>
  )
}
```

### Theme Properties

All theme properties are optional. If not provided, the default theme will be used:

- `primaryColor` - Main color used for UI elements (default: `#4b5563`)
- `highlightColor` - Color used for highlighted/active states (default: `#4b5563`)
- `backgroundColor` - Background color of the widget menu (default: `#f7f7fe`)
- `textColor` - Text color throughout the widget (default: `#000`)

### TypeScript Support for Themes

```tsx
import AccessibilityUI, { AccessibilityTheme } from "@rihal/accessibility-ui"

const customTheme: AccessibilityTheme = {
  primaryColor: "#2563eb",
  highlightColor: "#3b82f6",
  backgroundColor: "#f0f9ff",
  textColor: "#1e293b",
}

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI theme={customTheme} />
    </div>
  )
}
```

---

## Usage Example

### Basic Usage (All Widgets Enabled)

```jsx
import AccessibilityUI from "@rihal/accessibility-ui"

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
import AccessibilityUI from "@rihal/accessibility-ui"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI
        config={{
          // Content widgets
          adjustFontSize: true,
          dyslexiaFont: true,
          fontWeight: false, // Hide font weight widget
          textAlignLeft: true,
          textAlignCenter: true,
          textAlignRight: true,
          highlightLinks: true,
          highlightTitles: true,
          letterSpacing: true,
          lineHeight: true,
          wordSpacing: false, // Hide word spacing widget
          zoom: true,

          // Color widgets
          blueLightFilter: true,
          brightness: true,
          darkContrast: true,
          lightContrast: true,
          highContrast: true,
          highSaturation: false, // Hide high saturation widget
          lowSaturation: false, // Hide low saturation widget
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
import AccessibilityUI, { WidgetConfig } from "@rihal/accessibility-ui"

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

This accessibility widget provides a comprehensive suite of features designed to meet WCAG 2.1 guidelines and help create an inclusive web experience for all users. Each feature addresses specific accessibility needs and user preferences.

### 📝 Text Customization Features

#### Font Size Adjustment

**Purpose:** Allows users to scale text from 10% to 200% for improved readability.  
**Benefits:** Essential for users with low vision or reading difficulties. Supports WCAG 2.1 Success Criterion 1.4.4 (Resize Text).  
**Standards:** WCAG 2.1 Level AA - Users should be able to resize text up to 200% without loss of content or functionality.

#### Dyslexia-Friendly Font

**Purpose:** Applies the OpenDyslexic font, specifically designed to increase readability for users with dyslexia.  
**Benefits:** Unique letter shapes reduce confusion between similar-looking characters, helping dyslexic readers distinguish letters more easily.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.8 (Visual Presentation) by providing alternative font rendering options.

#### Font Weight

**Purpose:** Increases font weight to bold (700) across all text elements.  
**Benefits:** Improves text visibility and contrast, particularly helpful for users with low vision or in high-glare environments.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum) by enhancing text prominence.

#### Text Alignment Controls (Left/Center/Right)

**Purpose:** Allows users to change text alignment to their preference.  
**Benefits:** Helps users with certain cognitive disabilities or reading preferences. Some users find centered or right-aligned text easier to read.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.8 (Visual Presentation) regarding text alignment customization.

#### Highlight Links

**Purpose:** Adds a visible outline around all hyperlinks on the page.  
**Benefits:** Makes links more visually prominent, improving navigation for users with cognitive disabilities or low vision.  
**Standards:** Supports WCAG 2.1 Success Criterion 2.4.4 (Link Purpose) and 1.4.1 (Use of Color) by providing non-color visual distinction for links.

#### Highlight Titles

**Purpose:** Adds a visible outline around all heading elements (h1-h6).  
**Benefits:** Helps users quickly identify page structure and navigate content hierarchy, essential for cognitive accessibility.  
**Standards:** Supports WCAG 2.1 Success Criterion 2.4.6 (Headings and Labels) by making structural elements more visible.

#### Letter Spacing

**Purpose:** Adjustable spacing between characters (incremental adjustment in pixels).  
**Benefits:** Increases readability for users with dyslexia or visual processing difficulties. Reduces crowding of characters.  
**Standards:** WCAG 2.1 Success Criterion 1.4.12 (Text Spacing) - Letter spacing should be adjustable to at least 0.12 times the font size.

#### Word Spacing

**Purpose:** Adjustable spacing between words (incremental adjustment in pixels).  
**Benefits:** Improves text parsing and readability for users with dyslexia and cognitive disabilities.  
**Standards:** WCAG 2.1 Success Criterion 1.4.12 (Text Spacing) - Word spacing should be adjustable to at least 0.16 times the font size.

#### Line Height

**Purpose:** Adjustable spacing between lines of text (adjustable from 10% to 300%).  
**Benefits:** Reduces visual crowding and improves reading flow for users with dyslexia, low vision, or cognitive disabilities.  
**Standards:** WCAG 2.1 Success Criterion 1.4.12 (Text Spacing) - Line height should be adjustable to at least 1.5 times the font size.

### 🔍 Zoom & Magnification

#### Zoom Control

**Purpose:** Full-page zoom from 10% to 300% for content magnification.  
**Benefits:** Critical for users with low vision who need to magnify content beyond browser defaults. Preserves layout while enlarging.  
**Standards:** WCAG 2.1 Success Criterion 1.4.4 (Resize Text) and 1.4.10 (Reflow) - Content should be viewable at up to 200% zoom without loss of information.

### 🎨 Color & Contrast Controls

#### Blue Light Filter

**Purpose:** Applies a sepia filter (80%) to reduce blue light emission from screens.  
**Benefits:** Reduces eye strain and fatigue during extended viewing sessions, particularly beneficial for evening use and users sensitive to blue light.  
**Standards:** Supports user comfort and accessibility best practices for extended screen usage.

#### Brightness Control

**Purpose:** Adjustable screen brightness from 150% to 500%.  
**Benefits:** Allows users to adapt content to different lighting conditions and personal sensitivity. Essential for users with light sensitivity or photophobia.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum) by allowing users to control luminosity.

#### Contrast Mode (Light/Dark)

**Purpose:** Toggle between light background with dark text, or dark background with light text.  
**Benefits:** Provides high contrast color schemes preferred by many users with low vision or light sensitivity. Dark mode reduces eye strain in low-light environments.  
**Standards:** WCAG 2.1 Success Criterion 1.4.6 (Contrast Enhanced) - Enhanced contrast of at least 7:1 for optimal readability.

#### High Contrast Control

**Purpose:** Adjustable contrast from 125% to 200%.  
**Benefits:** Increases color differentiation and edge definition, crucial for users with low vision, color deficiencies, or contrast sensitivity.  
**Standards:** WCAG 2.1 Success Criterion 1.4.6 (Contrast Enhanced) Level AAA - Contrast ratio of at least 7:1 for normal text.

#### Saturation Control

**Purpose:** Adjustable color saturation from 50% to 800%.  
**Benefits:** Allows users to increase or decrease color intensity based on preference or visual needs. Helpful for users with color perception difficulties.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.1 (Use of Color) by allowing color adjustment without losing information.

#### Monochrome/Grayscale Mode

**Purpose:** Converts all colors to grayscale (100% desaturation).  
**Benefits:** Eliminates color distractions for users who find color overwhelming, and assists users with color blindness by focusing on luminosity contrast.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.1 (Use of Color) by ensuring information is not conveyed by color alone.

#### Text Color Picker

**Purpose:** Custom color selection for all text elements using a hex color picker.  
**Benefits:** Allows users to choose text colors that work best for their specific vision needs or preferences.  
**Standards:** Supports WCAG 2.1 Success Criterion 1.4.8 (Visual Presentation) by enabling user control over text colors.

#### Visual Impairment Mode (Color Inversion)

**Purpose:** Inverts all colors on the page (100% inversion filter).  
**Benefits:** Particularly helpful for users with severe light sensitivity, certain types of color blindness, or those who prefer negative contrast.  
**Standards:** Supports accessibility best practices for users with photophobia and specific visual processing needs.

### 🧰 Accessibility Tools

#### Big Cursor

**Purpose:** Replaces the default cursor with a larger, more visible custom cursor.  
**Benefits:** Essential for users with visual impairments, motor control difficulties, or those using large displays where the standard cursor is hard to track.  
**Standards:** Supports WCAG 2.1 Success Criterion 2.5.5 (Target Size) principles by making pointer interactions more visible.

#### Reading Guide

**Purpose:** Darkens areas above and below the cursor position, creating a horizontal reading strip that follows mouse movement.  
**Benefits:** Helps users with dyslexia, ADHD, or visual tracking difficulties maintain focus on the current line of text being read.  
**Standards:** Supports cognitive accessibility best practices and WCAG 2.1 Success Criterion 2.4.8 (Location) by helping users maintain reading position.

---

## Accessibility Standards Compliance

This widget is designed to help web applications meet and exceed international accessibility standards:

### WCAG 2.1 (Web Content Accessibility Guidelines)

The features in this widget support multiple WCAG 2.1 Success Criteria across all three conformance levels (A, AA, AAA):

- **Level A (Minimum):** Basic web accessibility features
- **Level AA (Mid-range):** Deals with the biggest and most common barriers for disabled users
- **Level AAA (Highest):** Highest level of accessibility

Key WCAG 2.1 Success Criteria addressed:

- **1.4.1** Use of Color (Level A)
- **1.4.3** Contrast Minimum (Level AA) - 4.5:1 contrast ratio
- **1.4.4** Resize Text (Level AA) - Up to 200% without loss of functionality
- **1.4.6** Contrast Enhanced (Level AAA) - 7:1 contrast ratio
- **1.4.8** Visual Presentation (Level AAA) - Text customization options
- **1.4.10** Reflow (Level AA) - Content reflows for 400% zoom
- **1.4.12** Text Spacing (Level AA) - Adjustable spacing without loss of content
- **2.4.4** Link Purpose (Level A)
- **2.4.6** Headings and Labels (Level AA)

### WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)

While this widget focuses on visual and cognitive accessibility, it follows WAI-ARIA authoring practices for interactive components and ensures compatibility with assistive technologies.

### References

- **WCAG 2.1 Guidelines:** [https://www.w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
- **WAI-ARIA Authoring Practices:** [https://www.w3.org/WAI/ARIA/apg/](https://www.w3.org/WAI/ARIA/apg/)
- **W3C Accessibility Principles:** [https://www.w3.org/WAI/fundamentals/accessibility-principles/](https://www.w3.org/WAI/fundamentals/accessibility-principles/)

### Best Practices Implemented

1. **Perceivable:** Multiple ways to adjust visual presentation (text size, colors, contrast, spacing)
2. **Operable:** All features are keyboard accessible and don't interfere with navigation
3. **Understandable:** Clear labels and predictable behavior for all controls
4. **Robust:** Works across different browsers and doesn't interfere with assistive technologies

By implementing this accessibility widget, your application takes significant steps toward WCAG 2.1 Level AA compliance and provides an inclusive experience for users with diverse needs.

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

## Combining Theme and Widget Configuration

You can customize both the theme and which widgets to display:

```jsx
import AccessibilityUI from "@rihal/accessibility-ui"

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <AccessibilityUI
        theme={{
          primaryColor: "#2563eb",
          highlightColor: "#3b82f6",
          backgroundColor: "#f0f9ff",
          textColor: "#1e293b",
        }}
        config={{
          adjustFontSize: true,
          dyslexiaFont: true,
          zoom: true,
          highContrast: true,
          bigCursor: true,
          readingGuide: true,
          // Disable widgets you don't need
          wordSpacing: false,
          highSaturation: false,
        }}
      />
    </div>
  )
}
```

---

## Quick Start

Install and add to your React project:

```bash
yarn add @rihal/accessibility-ui
# or
npm install @rihal/accessibility-ui
```

### All Widgets Enabled (Default)

```jsx
import AccessibilityUI from "@rihal/accessibility-ui"

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
import AccessibilityUI from "@rihal/accessibility-ui"

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

Empower everyone to navigate your site comfortably with @rihal/accessibility-ui—no setup required.
