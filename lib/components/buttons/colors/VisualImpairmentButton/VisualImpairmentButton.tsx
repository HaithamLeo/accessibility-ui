import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { EyeOff as BlindIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"

const styleID = "a11y-visual-impairment-style"
const rootClass = "a11y-visual-impairment"

interface VisualImpairmentButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const VisualImpairmentButton: FC<VisualImpairmentButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isVisualImpairment } = widgetState
  const toggleVisuality = () => {
    onChangeWidgetState((draft) => {
      draft.isVisualImpairment = !draft.isVisualImpairment
    })
  }

  useLayoutEffect(() => {
    if (isVisualImpairment) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: invert(100%) !important;
                    -ms-filter: invert(100%) !important;
                    -moz-filter: invert(100%) !important;
                    -webkit-filter: invert(100%) !important;
                    filter: invert(100%) !important;
                }
            `
      document.head.appendChild(style)
    } else {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isVisualImpairment])

  return (
    <WidgetButton
      Icon={BlindIcon}
      isToggled={isVisualImpairment}
      onToggle={toggleVisuality}
      titleTranslationKey="colors.visualImpairment"
      title="Visual Impairment"
    />
  )
}

export default VisualImpairmentButton
