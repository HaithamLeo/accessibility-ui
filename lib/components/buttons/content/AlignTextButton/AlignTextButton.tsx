import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
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

  const getAlignIcon = () => {
    switch (direction) {
      case "left":
        return AlignLeft
      case "center":
        return AlignCenter
      case "right":
        return AlignRight
      default:
        return AlignCenter
    }
  }

  const alignHandler = () => {
    onChangeWidgetState((d) => {
      const prevDirection = d.textAlign[direction]
      // Reset all alignments
      d.textAlign.left = null
      d.textAlign.center = null
      d.textAlign.right = null
      // Set the selected alignment if it wasn't already active
      if (!prevDirection) {
        d.textAlign[direction] = direction
      }
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
      Icon={getAlignIcon()}
      isToggled={isToggled}
      onToggle={alignHandler}
      titleTranslationKey={translationKey}
      title="Text Align"
    />
  )
}

export default AlignTextButton
