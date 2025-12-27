"use client"

import { AccessibilityUI } from "react-a11y-kit"

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Testing React A11Y Kit in Next.js</h1>

      <section style={{ marginTop: "2rem" }}>
        <h2>Sample Content</h2>
        <p>
          This is a test page to demonstrate the react-a11y-kit accessibility features. Click the accessibility button
          to open the menu and test various features.
        </p>

        <div style={{ marginTop: "1rem" }}>
          <h3>Features to test:</h3>
          <ul>
            <li>Font size adjustment</li>
            <li>Contrast modes</li>
            <li>Text spacing</li>
            <li>Line height</li>
            <li>Highlight links and titles</li>
            <li>Reading guide</li>
            <li>And more...</li>
          </ul>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <a href="https://github.com/HaithamLeo/accessibility-ui" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <img
            src="https://via.placeholder.com/400x200"
            alt="Placeholder"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </section>

      {/* Accessibility UI Component */}
      <AccessibilityUI />
    </main>
  )
}
