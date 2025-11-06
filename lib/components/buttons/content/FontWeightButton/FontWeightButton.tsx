import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Bold as FormatBoldIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"

const styleID = "a11y-font-weight-style"
const rootClass = "a11y-font-weight"

interface FontWeightButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const FontWeightButton: FC<FontWeightButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isFontWeightBold } = widgetState

  const toggleFontWeightHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isFontWeightBold = !draft.isFontWeightBold
    })
  }

  useLayoutEffect(() => {
    if (isFontWeightBold) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  html.${rootClass} *, *  {
                  font-weight:700 !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isFontWeightBold])

  return (
    <WidgetButton
      Icon={FormatBoldIcon}
      isToggled={isFontWeightBold}
      onToggle={toggleFontWeightHandler}
      titleTranslationKey="content.fontWeight"
      title="Font Weight"
    />
  )
}

export default FontWeightButton
