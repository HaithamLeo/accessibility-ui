import React from "react"
import { Accessibility as LucideAccessibility } from "lucide-react"
import IconBase, { IconBaseProps } from "components/Icons/IconBase"
import styles from "components/Icons/accessibility.module.scss"

export interface AccessibilityIconProps extends Omit<IconBaseProps, "onClick"> {
  isFloating?: boolean
  direction?: "ltr" | "rtl"
  onClick?: () => void
}

const Accessibility: React.FC<AccessibilityIconProps> = ({
  size,
  color,
  className,
  style,
  isFloating = false,
  direction = "ltr",
  onClick,
}) => {
  if (isFloating) {
    return (
      <button
        className={`${styles.floatingButton} ${direction === "rtl" ? styles.rtl : styles.ltr} ${className || ""}`}
        style={style}
        onClick={onClick}
        dir={direction}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === " ") {
            e.preventDefault()
          }
        }}
        aria-label="Open Accessibility Settings"
      >
        <LucideAccessibility
          className={styles.floatingIcon}
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          width={size || 24}
          height={size || 24}
          aria-hidden="true"
        />
      </button>
    )
  }

  return (
    <IconBase size={size} color={color} className={className} style={style}>
      <LucideAccessibility stroke="currentColor" fill="none" strokeWidth="2" height="100%" width="100%" />
    </IconBase>
  )
}

export default Accessibility
