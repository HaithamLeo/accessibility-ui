import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Link } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"

const styleID = "a11y-highlight-links-style"
const rootClass = "a11y-highlight-links"

interface HighlightLinksButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const HighlightLinksButton: FC<HighlightLinksButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { highlightLinks } = widgetState

  const toggleHighlightHander = () => {
    onChangeWidgetState((draft) => {
      draft.highlightLinks = !draft.highlightLinks
    })
  }

  useLayoutEffect(() => {
    if (highlightLinks) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                    html.${rootClass} a[href],a[href] {
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
  }, [highlightLinks])

  return (
    <WidgetButton
      Icon={Link}
      isToggled={highlightLinks}
      onToggle={toggleHighlightHander}
      titleTranslationKey="content.highlightLinks"
      title="Highlight Links"
    />
  )
}

export default HighlightLinksButton
