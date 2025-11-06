import AccessibilityUI from "../lib/main"
import DemoAccessibilityUI from "./components/DemoAccessibilityUI"

const App = (): JSX.Element => {
  const theme = {
    primaryColor: "#9333ea",
    highlightColor: "#a855f7",
    backgroundColor: "#faf5ff",
    textColor: "#581c87",
  }

  return (
    <>
      <DemoAccessibilityUI />
      <AccessibilityUI theme={theme} />
    </>
  )
}

export default App
