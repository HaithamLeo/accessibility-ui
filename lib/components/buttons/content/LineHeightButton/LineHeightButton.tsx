import { FC, useLayoutEffect } from "react"
import styled from "components/buttons/content/LineHeightButton/LineHeightButton.module.scss"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { WIDGET_PORTAL_ID } from "lib/constants"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { ListIndentIncrease } from "lucide-react"
import ValueControlButton from "components/buttons/ValueControlButton/ValueControlButton"

const styleID = "a11y-line-height-style"
const rootClass = "a11y-line-height"

interface LineHeightButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const LineHeightButton: FC<LineHeightButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { lineHeight, isLineHeight } = widgetState.lineHeight

  const increaseLineHeightHandler = () => {
    onChangeWidgetState((draft) => {
      draft.lineHeight.lineHeight += 0.1
    })
  }
  const decreaseLineHeightHandler = () => {
    onChangeWidgetState((draft) => {
      if (draft.lineHeight.lineHeight > 0.1) {
        draft.lineHeight.lineHeight -= 0.1
      }
    })
  }
  const lineHeighToggleHandler = () => {
    onChangeWidgetState((draft) => {
      const isActive = !draft.lineHeight.isLineHeight
      draft.lineHeight.isLineHeight = isActive
      draft.lineHeight.lineHeight = isActive ? 3 : 0
    })
  }

  useLayoutEffect(() => {
    if (isLineHeight && lineHeight) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  html.${rootClass} *:not(#${WIDGET_PORTAL_ID} *), *:not(#${WIDGET_PORTAL_ID} *)  {
                  line-height:${lineHeight.toFixed(1)} !important
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [lineHeight, isLineHeight])

  const renderControlButtons = () => {
    if (!isLineHeight) return null
    return (
      <div className={styled.accLineHeightButton}>
        {isLineHeight && <ValueControlButton onClick={increaseLineHeightHandler} controlType="increase" />}
        <ValueControlButton onClick={lineHeighToggleHandler} controlType="init" />
        {isLineHeight && <ValueControlButton onClick={decreaseLineHeightHandler} controlType="decrease" />}
      </div>
    )
  }

  return (
    <WidgetButton
      Icon={ListIndentIncrease}
      titleTranslationKey={"content.lineHeight"}
      title="Line Height"
      elementType={!isLineHeight ? "button" : "div"}
      isActive={isLineHeight}
      onToggle={!isLineHeight ? lineHeighToggleHandler : undefined}
      stats={lineHeight ? `${(lineHeight * 100).toFixed(0)}%` : undefined}
    >
      {renderControlButtons()}
    </WidgetButton>
  )
}

export default LineHeightButton
