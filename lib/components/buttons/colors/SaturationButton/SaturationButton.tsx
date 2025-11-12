import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Droplets } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import RcSlider from "components/RcSlider/RcSlider"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const styleID = "a11y-saturation-style"
const rootClass = "a11y-saturation"

interface SaturationButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const SaturationButton: FC<SaturationButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isSaturation, saturation } = widgetState.saturation || { isSaturation: false, saturation: 100 }

  const increaseSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      if (!draft.saturation) {
        draft.saturation = { isSaturation: true, saturation: 100 }
      }
      if (draft.saturation.saturation < 800) {
        draft.saturation.saturation++
      }
    })
  }
  const decreaseSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      if (!draft.saturation) {
        draft.saturation = { isSaturation: true, saturation: 100 }
      }
      if (draft.saturation.saturation > 50) {
        draft.saturation.saturation--
      }
    })
  }
  const toggleSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      if (!draft.saturation) {
        draft.saturation = { isSaturation: false, saturation: 100 }
      }
      const isActive = !draft.saturation.isSaturation
      draft.saturation.isSaturation = isActive
      draft.saturation.saturation = isActive ? 100 : 0
    })
  }

  const renderControlButtons = () => {
    if (!isSaturation) return null
    return (
      <ValueControl
        onIncrease={increaseSaturationHandler}
        onToggle={toggleSaturationHandler}
        onDescrease={decreaseSaturationHandler}
      />
    )
  }

  useLayoutEffect(() => {
    if (isSaturation) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: saturate(${saturation}%) !important;
                    -ms-filter: saturate(${saturation}%) !important;
                    -moz-filter: saturate(${saturation}%) !important;
                    -webkit-filter: saturate(${saturation}%) !important;
                    filter: saturate(${saturation}%) !important;
                }
            `
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isSaturation, saturation])

  return (
    <WidgetButton
      Icon={Droplets}
      titleTranslationKey="colors.saturation"
      title="Saturation"
      stats={isSaturation ? `${saturation}%` : undefined}
      elementType={!isSaturation ? "button" : "div"}
      isActive={isSaturation}
      onToggle={!isSaturation ? toggleSaturationHandler : undefined}
    >
      {renderControlButtons()}

      {isSaturation && (
        <RcSlider
          range
          min={50}
          max={800}
          value={saturation}
          onChange={(e) => {
            onChangeWidgetState((draft) => {
              if (!draft.saturation) {
                draft.saturation = { isSaturation: true, saturation: 100 }
              }
              draft.saturation.saturation = e as number
            })
          }}
        />
      )}
    </WidgetButton>
  )
}

export default SaturationButton
