# Next.js Usage Guide

## Installation

```bash
npm install react-a11y-kit
```

## Usage in Next.js (App Router)

For Next.js applications, use the `/client` entry point with dynamic import:

```tsx
import dynamic from "next/dynamic"

const AccessibilityUI = dynamic(() => import("react-a11y-kit/client"), { ssr: false })

export default function MyApp() {
  return (
    <div>
      <AccessibilityUI />
    </div>
  )
}
```

## Usage in Regular React Apps

For standard React applications (Vite, Create React App, etc.):

```tsx
import AccessibilityUI from "react-a11y-kit"

export default function App() {
  return (
    <div>
      <AccessibilityUI />
    </div>
  )
}
```

## Why Two Entry Points?

- **Main entry** (`react-a11y-kit`): Clean build without directives, perfect for React apps
- **Client entry** (`react-a11y-kit/client`): Has `"use client"` directive, specifically for Next.js

This dual-entry approach ensures the library works seamlessly in both environments with minimal configuration.

## Configuration

Both entry points support the same props and configuration:

```tsx
<AccessibilityUI
  config={{
    position: "bottom-right",
    theme: "light",
    // ... other config options
  }}
/>
```

See the main README for full configuration options.
