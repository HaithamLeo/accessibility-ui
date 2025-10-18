import { FC, useLayoutEffect } from "react"
import DYSLEXIA_FONT_STYLE from "components/buttons/content/DyslexiaFontButton/style"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import SortByAlphaIcon from "assets/icons/dyslexia.svg?react"

const styleID = "a11y-dyslexia-font-style"
const rootClass = "a11y-dyslexia-font"

interface DyslexiaFontButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const DyslexiaFontButton: FC<DyslexiaFontButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isDyslexiaFont } = widgetState

  const toogleDyslexiaFontHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isDyslexiaFont = !draft.isDyslexiaFont
    })
  }

  useLayoutEffect(() => {
    if (isDyslexiaFont) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = DYSLEXIA_FONT_STYLE
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isDyslexiaFont])
  return (
    <WidgetButton
      Icon={SortByAlphaIcon}
      isToggled={isDyslexiaFont}
      onToggle={toogleDyslexiaFontHandler}
      titleTranslationKey="content.dyslexiaFont"
      title="Dyslexia Font"
    />
  )
}

export default DyslexiaFontButton
