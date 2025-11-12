import { FC, useLayoutEffect } from "react"
import { LightbulbOff } from "lucide-react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"

const styleID = "a11y-blueLight-filter-style"
const rootClass = "a11y-blue-light-filter"

interface BlueLightFilterButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const BlueLightFilterButton: FC<BlueLightFilterButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isBlueLightFilter } = widgetState
  const toggleBluetLightFilter = () => {
    onChangeWidgetState((draft) => {
      draft.isBlueLightFilter = !draft.isBlueLightFilter
    })
  }

  useLayoutEffect(() => {
    if (isBlueLightFilter) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: sepia(80%) !important;
                    -ms-filter: sepia(80%) !important;
                    -moz-filter: sepia(80%) !important;
                    -webkit-filter: sepia(80%) !important;
                    filter: sepia(80%) !important;
                }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isBlueLightFilter])

  return (
    <WidgetButton
      Icon={LightbulbOff}
      isToggled={isBlueLightFilter}
      onToggle={toggleBluetLightFilter}
      titleTranslationKey="colors.blueLightFilter"
      title="Blue Light Filter"
    />
  )
}

export default BlueLightFilterButton
