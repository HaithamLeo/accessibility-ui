import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Type as TitleIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"

const styleID = "a11y-highlight-titles-style"
const rootClass = "a11y-highlight-titles"

interface HighlightTitlesButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const HighlightTitlesButton: FC<HighlightTitlesButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { highlightTitles } = widgetState

  const toggleHighlightHander = () => {
    onChangeWidgetState((draft) => {
      draft.highlightTitles = !draft.highlightTitles
    })
  }

  useLayoutEffect(() => {
    if (highlightTitles) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                    html.${rootClass} h1,h2,h3,h4,h5,h6,h1,h2,h3,h4,h5,h6  {
                    outline: 2px solid var(--highlight-color) !important;
                    outline-offset: 2px !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [highlightTitles])

  return (
    <WidgetButton
      Icon={TitleIcon}
      isToggled={highlightTitles}
      onToggle={toggleHighlightHander}
      titleTranslationKey="content.highlightTitles"
      title="Highlight Titles"
    />
  )
}

export default HighlightTitlesButton
