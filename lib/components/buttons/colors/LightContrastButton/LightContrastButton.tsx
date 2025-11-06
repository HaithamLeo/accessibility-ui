import { FC, useLayoutEffect, useMemo } from "react"
import { textTags } from "lib/constants"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Contrast as Brightness4SharpIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"

const styleID = "a11y-light-contrast-style"
const rootClass = "a11y-light-contrast"

interface LightContrastButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const LightContrastButton: FC<LightContrastButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1
      const HTML = `html.${rootClass}`
      const delimiter = index === lastIndex ? "" : ","
      return (acc += `${HTML} ${tag}${delimiter}`)
    }, "")
  }, [])

  const toggleLightContrastHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isLightContrast = !draft.isLightContrast
    })
  }

  useLayoutEffect(() => {
    if (widgetState.isLightContrast) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  ${textSelectors},${textTags.join(",")} {
                  color:#000 !important;
                  fill: #000 !important;
                  background-color: #FFF !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [widgetState.isLightContrast, textSelectors])

  return (
    <WidgetButton
      Icon={Brightness4SharpIcon}
      isToggled={widgetState.isDarkContrast}
      onToggle={toggleLightContrastHandler}
      titleTranslationKey="colors.lightContrast"
      title="Light Contrast"
    />
  )
}

export default LightContrastButton
