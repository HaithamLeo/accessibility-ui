import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { Camera as MonochromePhotosIcon } from "lucide-react"

const styleID = "a11y-monochrome-style"
const rootClass = "a11y-monochrome"

interface MonochromeButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const MonochromeButton: FC<MonochromeButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isMonochrome } = widgetState
  const toggleMonochromeHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isMonochrome = !draft.isMonochrome
    })
  }

  useLayoutEffect(() => {
    if (isMonochrome) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: grayscale(100%) !important;
                    -ms-filter: grayscale(100%) !important;
                    -moz-filter: grayscale(100%) !important;
                    -webkit-filter: grayscale(100%) !important;
                    filter: grayscale(100%) !important;
                }
            `
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isMonochrome])

  return (
    <WidgetButton
      Icon={MonochromePhotosIcon}
      isToggled={isMonochrome}
      onToggle={toggleMonochromeHandler}
      titleTranslationKey="colors.monochrom"
      title="Monochrom"
    />
  )
}

export default MonochromeButton
