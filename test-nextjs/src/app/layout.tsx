import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Test React A11Y Kit",
  description: "Testing react-a11y-kit in Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
