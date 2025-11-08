import { FC, useLayoutEffect } from "react"
import cursor from "components/buttons/tools/BigCursorButton/cursor"
import { getDataImageSvgBase64 } from "lib/utils"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { MousePointer } from "lucide-react"

const styleID = "a11y-big-cursor-style"
const rootClass = "a11y-big-cursor"

interface BigCursorButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const BigCursorButton: FC<BigCursorButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isBigCursor } = widgetState

  const toggleBigCursorHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isBigCursor = !draft.isBigCursor
    })
  }

  useLayoutEffect(() => {
    if (isBigCursor) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass}  body * {
                    cursor:url(${getDataImageSvgBase64(cursor)}),default !important;}
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isBigCursor])

  return (
    <WidgetButton
      Icon={MousePointer}
      isToggled={isBigCursor}
      onToggle={toggleBigCursorHandler}
      titleTranslationKey="tools.bigCursor"
      title="Big Cursor"
    />
  )
}

export default BigCursorButton
