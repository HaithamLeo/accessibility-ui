import { FC } from "react"
import { Accessibility } from "components/Icons"

interface AccessibilityButtonProps {
  onShow?: () => void
  direction?: "ltr" | "rtl"
}

const AccessibilityButton: FC<AccessibilityButtonProps> = ({ onShow, direction = "ltr" }) => {
  return <Accessibility isFloating={true} direction={direction} onClick={onShow} size={40} />
}

export default AccessibilityButton
