import { FC, useLayoutEffect, useMemo } from "react"
import { HexColorPicker } from "react-colorful"
import { WIDGET_PORTAL_ID, textTags } from "lib/constants"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import ColorPickIcon from "assets/icons/platte.svg?react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import ValueControlButton from "components/buttons/ValueControlButton/ValueControlButton"
import styled from "components/buttons/colors/TextColorPickerButton/TextColorPickerButton.module.scss"

const styleID = "a11y-text-color-picker-style"
const rootClass = "a11y-text-color-picker"

interface TextColorPickerButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const TextColorPickerButton: FC<TextColorPickerButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { color } = widgetState

  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1
      const HTML = `html.${rootClass}`
      const delimiter = index === lastIndex ? "" : ","
      return (acc += `${HTML} ${tag}:not(#${WIDGET_PORTAL_ID} *)${delimiter}`)
    }, "")
  }, [])

  const joinedTags = textTags.map((tag) => `${tag}:not(#${WIDGET_PORTAL_ID} *)`).join(",")

  const handleColorChange = (value: string) => {
    onChangeWidgetState((draft) => {
      draft.color = value
    })
  }

  const initColorPickerHandler = () => {
    handleColorChange("")
  }

  useLayoutEffect(() => {
    if (color) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                  ${textSelectors},${joinedTags} {
                  color: ${color} !important;
                }
            `
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [color, joinedTags, textSelectors])

  return (
    <WidgetButton
      Icon={ColorPickIcon}
      titleTranslationKey="colors.textColorPicker"
      elementType="div"
      title="Text Color Picker"
      className={styled.accButtonTextColorPicker}
    >
      <div className={styled.accTextColorPicker}>
        <div className={styled.accTextColorPicker__topContainer}>
          <ValueControlButton onClick={initColorPickerHandler} controlType="init" />
          <input
            placeholder="#000000"
            type="text"
            value={color}
            className={styled.accTextColorPicker__inputText}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
        <HexColorPicker
          className={styled.accTextColorPicker__hexColorPicker}
          color={color}
          onChange={handleColorChange}
        />
      </div>
    </WidgetButton>
  )
}

export default TextColorPickerButton
