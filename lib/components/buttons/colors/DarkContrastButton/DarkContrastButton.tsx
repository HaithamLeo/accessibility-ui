import { FC, useLayoutEffect, useMemo } from "react"
import { textTags } from "lib/constants"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { Moon as Brightness4SharpIcon } from "lucide-react"

const styleID = "a11y-dark-contrast-style"
const rootClass = "a11y-dark-contrast"

interface DarkContrastButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const DarkContrastButton: FC<DarkContrastButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1
      const HTML = `html.${rootClass}`
      const delimiter = index === lastIndex ? "" : ","
      return (acc += `${HTML} ${tag}${delimiter}`)
    }, "")
  }, [])

  const toggleDarkContrastHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isDarkContrast = !draft.isDarkContrast
    })
  }

  useLayoutEffect(() => {
    if (widgetState.isDarkContrast) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  ${textSelectors},${textTags.join(",")} {
                  color:#FFF !important;
                  fill: #FFF !important;
                  background-color: #000 !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [widgetState.isDarkContrast, textSelectors])

  return (
    <WidgetButton
      Icon={Brightness4SharpIcon}
      isToggled={widgetState.isDarkContrast}
      onToggle={toggleDarkContrastHandler}
      titleTranslationKey="colors.darkContrast"
      title="Dark Contrast"
    />
  )
}

export default DarkContrastButton
