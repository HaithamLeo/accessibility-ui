import { FC } from "react"
import AccessibilityUI from "../lib/main"
import DemoAccessibilityUI from "./components/DemoAccessibilityUI"

const App: FC = () => {
  return (
    <>
      <DemoAccessibilityUI />
      <AccessibilityUI />
    </>
  )
}

export default App
