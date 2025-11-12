import { FC, useLayoutEffect, useMemo } from "react"
import { textTags } from "lib/constants"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { Contrast } from "lucide-react"

const styleID = "a11y-contrast-mode-style"
const rootClass = "a11y-contrast-mode"

interface ContrastModeButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const ContrastModeButton: FC<ContrastModeButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isContrastMode, mode } = widgetState.contrastMode || { isContrastMode: false, mode: null }

  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1
      const HTML = `html.${rootClass}`
      const delimiter = index === lastIndex ? "" : ","
      return (acc += `${HTML} ${tag}${delimiter}`)
    }, "")
  }, [])

  const toggleContrastModeHandler = () => {
    onChangeWidgetState((draft) => {
      if (!draft.contrastMode) {
        draft.contrastMode = { isContrastMode: false, mode: null }
      }
      if (!draft.contrastMode.isContrastMode) {
        draft.contrastMode.isContrastMode = true
        draft.contrastMode.mode = "dark"
      } else if (draft.contrastMode.mode === "dark") {
        draft.contrastMode.mode = "light"
      } else {
        draft.contrastMode.isContrastMode = false
        draft.contrastMode.mode = null
      }
    })
  }

  useLayoutEffect(() => {
    if (isContrastMode && mode) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID

      const isDark = mode === "dark"
      const textColor = isDark ? "#FFF" : "#000"
      const bgColor = isDark ? "#000" : "#FFF"

      const scopedSelectors = textTags.map((tag) => `html.${rootClass} ${tag}`).join(",")
      style.innerHTML = `
      ${scopedSelectors} {
        color: ${textColor} !important;
        fill: ${textColor} !important;
        background-color: ${bgColor} !important;
      }`

      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isContrastMode, mode, textSelectors])

  const getDisplayText = () => {
    if (!isContrastMode) return undefined
    return mode === "dark" ? "Dark" : "Light"
  }

  return (
    <WidgetButton
      Icon={Contrast}
      isToggled={isContrastMode}
      onToggle={toggleContrastModeHandler}
      titleTranslationKey="colors.contrastMode"
      title="Contrast Mode"
      stats={getDisplayText()}
    />
  )
}

export default ContrastModeButton
