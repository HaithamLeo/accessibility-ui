import { FC } from "react"
import AccessibilityUI from "../lib/main"
import DemoAccessibilityUI from "./components/DemoAccessibilityUI"

const App: FC = () => {
  return (
    <>
      <DemoAccessibilityUI />
      <AccessibilityUI
        theme={{ primaryColor: "#9333ea", highlightColor: "#a855f7", backgroundColor: "#faf5ff", textColor: "#581c87" }}
      />
    </>
  )
}

export default App
