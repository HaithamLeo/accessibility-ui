"use client"

import dynamic from "next/dynamic"

const AccessibilityUI = dynamic(() => import("react-a11y-kit/client"), {
  ssr: false,
})

const sampleText = `
Welcome to the react-a11y-kit demo page!

This page allows you to interact with all the accessibility features before installing the package. 
Try out font adjustments, color modes, language switching, reading guides, and more.

Headings, paragraphs, links, and images below will respond to react-a11y-kit controls.

Features to try:
- Change text size, line height, spacing, and alignment
- Switch fonts (including dyslexia-friendly options)
- Color and contrast modes (dark, high contrast, monochrome, etc.)
- Blue light filter and brightness controls
- Reading guide
- Zoom and big cursor
`

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "sans-serif",
        background: "#f9f9fc",
        minHeight: "100vh",
        paddingBottom: "6rem",
      }}
    >
      <header
        style={{
          background: "linear-gradient(90deg,#90caf9,#e1bee7)",
          padding: "2rem 0",
          textAlign: "center",
          marginBottom: "2rem",
          boxShadow: "0 2px 10px rgba(126,87,194,0.08)",
        }}
      >
        <h1 style={{ color: "#4A148C", fontSize: "2.8rem", margin: 0 }}>react-a11y-kit Demo Page</h1>
        <p style={{ color: "#333", fontSize: "1.1rem", marginTop: "1rem" }}>
          Experience all accessibility features live in Next.js!
        </p>
      </header>

      <section
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 6px 32px rgba(90,90,140,0.09)",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <h2>Try Accessibility Features</h2>
        <p>{sampleText}</p>

        <h3>Example Heading</h3>
        <p>
          This is an example paragraph. Try adjusting the font, color, or spacing using the widget. You can also{" "}
          <a
            href="https://github.com/HaithamLeo/accessibility-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", fontWeight: "bold" }}
          >
            visit the GitHub repo
          </a>
          .
        </p>

        <ul>
          <li>Change font size and weight</li>
          <li>Switch to dyslexia-friendly fonts</li>
          <li>Modify contrast, brightness, and saturation</li>
          <li>Use the reading guide</li>
        </ul>

        <img
          src="https://picsum.photos/400/200"
          alt="Demo image for accessibility"
          style={{
            display: "block",
            margin: "2rem auto",
            borderRadius: "8px",
            border: "2px solid #7e57c2",
            maxWidth: "100%",
          }}
        />
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "2rem 0",
          background: "#ececff",
          color: "#444",
          marginTop: "2rem",
        }}
      >
        <strong>Tested with react-a11y-kit in Next.js</strong>
        <br />
        <span>Created for demonstration purposes. Try all features before installing in your own app!</span>
      </footer>

      {/* Accessibility UI Component with custom theme */}
      <AccessibilityUI
        theme={{
          primaryColor: "#9333ea",
          highlightColor: "#a855f7",
          backgroundColor: "#faf5ff",
          textColor: "#581c87",
        }}
      />
    </main>
  )
}
