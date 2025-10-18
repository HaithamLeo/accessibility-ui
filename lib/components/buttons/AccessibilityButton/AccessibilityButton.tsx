import { FC } from "react"
import styled from "components/buttons/AccessibilityButton/accessibilityButton.module.scss"
import { Accessibility } from "components/Icons"

interface AccessibilityButtonProps {
  onShow?: () => void
}

const AccessibilityButton: FC<AccessibilityButtonProps> = ({ onShow }) => {
  return (
    <div className={styled.AccessibilityBtn} onClick={onShow} role="button" title="Open Accessibility Settings">
      <Accessibility className={styled.AccessibilityIcon} size={40} />
    </div>
  )
}

export default AccessibilityButton
