import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { AlignCenter } from "lucide-react"
import { WIDGET_PORTAL_ID } from "lib/constants"

const styleID = "a11y-align-text-style"
const rootClass = "a11y-align-text"
type Direction = "right" | "center" | "left"

interface AlignTextButtonProps {
  direction: Direction
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
  translationKey: string
}

const AlignTextButton: FC<AlignTextButtonProps> = ({ direction, widgetState, onChangeWidgetState, translationKey }) => {
  const { textAlign } = widgetState
  const dir = textAlign[direction]
  const isToggled = !!dir

  const alignHandler = () => {
    onChangeWidgetState((d) => {
      const prevDirection = d.textAlign[direction]
      d.textAlign[direction] = !prevDirection ? direction : null
    })
  }

  useLayoutEffect(() => {
    if (dir) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  html.${rootClass} *:not(#${WIDGET_PORTAL_ID} *), *:not(#${WIDGET_PORTAL_ID} *)  {
                  text-align:${dir} !important
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [dir, direction])

  return (
    <WidgetButton
      Icon={AlignCenter}
      isToggled={isToggled}
      onToggle={alignHandler}
      titleTranslationKey={translationKey}
      title="Text Align"
    />
  )
}

export default AlignTextButton
