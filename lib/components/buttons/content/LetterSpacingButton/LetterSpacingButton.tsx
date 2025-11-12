import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { WIDGET_PORTAL_ID } from "lib/constants"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { SpaceIcon } from "lucide-react"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const styleID = "a11y-letter-spacing-style"
const rootClass = "a11y-letter-spacing"

interface LetterSpacingButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const LetterSpacingButton: FC<LetterSpacingButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { letterSpacing } = widgetState
  const isLetterSpacing = !!letterSpacing

  const increaseLetterSpacingHandler = () => {
    onChangeWidgetState((draft) => {
      draft.letterSpacing++
    })
  }
  const decreaseLetterSpacingHandler = () => {
    onChangeWidgetState((draft) => {
      if (draft.letterSpacing > 0) {
        draft.letterSpacing--
      }
    })
  }
  const toggleLetterSpacingHandler = () => {
    onChangeWidgetState((draft) => {
      const { letterSpacing } = draft
      draft.letterSpacing = !letterSpacing ? 1 : 0
    })
  }

  useLayoutEffect(() => {
    if (isLetterSpacing) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  html.${rootClass} *:not(#${WIDGET_PORTAL_ID} *), *:not(#${WIDGET_PORTAL_ID} *)  {
                  letter-spacing:${letterSpacing}px !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [letterSpacing, isLetterSpacing])

  const renderControlButtons = () => {
    if (!isLetterSpacing) return null
    return (
      <ValueControl
        onIncrease={increaseLetterSpacingHandler}
        onToggle={toggleLetterSpacingHandler}
        onDescrease={decreaseLetterSpacingHandler}
      />
    )
  }

  return (
    <WidgetButton
      Icon={SpaceIcon}
      titleTranslationKey={"content.letterSpacing"}
      title="Letter Spacing"
      stats={letterSpacing ? `${letterSpacing}px` : undefined}
      elementType={!isLetterSpacing ? "button" : "div"}
      isActive={isLetterSpacing}
      onToggle={!isLetterSpacing ? toggleLetterSpacingHandler : undefined}
    >
      {renderControlButtons()}
    </WidgetButton>
  )
}

export default LetterSpacingButton
