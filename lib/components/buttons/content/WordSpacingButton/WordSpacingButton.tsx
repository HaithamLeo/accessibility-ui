import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { WIDGET_PORTAL_ID } from "lib/constants"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { SpaceIcon } from "lucide-react"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const styleID = "a11y-word-spacing-style"
const rootClass = "a11y-word-spacing"

interface WordSpacingButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const WordSpacingButton: FC<WordSpacingButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { wordSpacing } = widgetState
  const isWordSpacing = !!wordSpacing

  const increaseWordSpacingHandler = () => {
    onChangeWidgetState((draft) => {
      draft.wordSpacing++
    })
  }
  const decreaseWordSpacingHandler = () => {
    onChangeWidgetState((draft) => {
      if (draft.wordSpacing > 0) {
        draft.wordSpacing--
      }
    })
  }
  const toggleWordSpacingHandler = () => {
    onChangeWidgetState((draft) => {
      const { wordSpacing } = draft
      draft.wordSpacing = !wordSpacing ? 1 : 0
    })
  }

  useLayoutEffect(() => {
    if (isWordSpacing) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                 html.${rootClass} *:not(#${WIDGET_PORTAL_ID} *), *:not(#${WIDGET_PORTAL_ID} *)  {
                  word-spacing:${wordSpacing}px !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [wordSpacing, isWordSpacing])

  const renderControlButtons = () => {
    if (!isWordSpacing) return null
    return (
      <ValueControl
        onIncrease={increaseWordSpacingHandler}
        onToggle={toggleWordSpacingHandler}
        onDescrease={decreaseWordSpacingHandler}
      />
    )
  }

  return (
    <WidgetButton
      Icon={SpaceIcon}
      titleTranslationKey={"content.wordsSpacing"}
      title="Word Spacing"
      stats={wordSpacing ? `${wordSpacing}px` : undefined}
      elementType={!isWordSpacing ? "button" : "div"}
      isActive={isWordSpacing}
      onToggle={!isWordSpacing ? toggleWordSpacingHandler : undefined}
    >
      {renderControlButtons()}
    </WidgetButton>
  )
}

export default WordSpacingButton
