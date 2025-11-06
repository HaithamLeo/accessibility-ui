import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Blend as HighSaturationIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import RcSlider from "components/RcSlider/RcSlider"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const styleID = "a11y-low-saturation-style"
const rootClass = "a11y-low-saturation"

interface LowSaturationButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}
const LowSaturationButton: FC<LowSaturationButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isLowSaturation, saturation } = widgetState.lowSaturation

  const increaseLowSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      const { lowSaturation } = draft
      if (lowSaturation.saturation < 199) {
        draft.lowSaturation.saturation++
      }
    })
  }
  const decreaseLowSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      const { lowSaturation } = draft
      if (lowSaturation.saturation > 50) {
        draft.lowSaturation.saturation--
      }
    })
  }
  const toggleLowSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      const isActive = !draft.lowSaturation.isLowSaturation
      draft.lowSaturation.isLowSaturation = isActive
      draft.lowSaturation.saturation = isActive ? 50 : 0
    })
  }

  useLayoutEffect(() => {
    if (isLowSaturation) {
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
    } else {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }

    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isLowSaturation, saturation])

  const renderControlButtons = () => {
    if (!isLowSaturation) return null
    return (
      <ValueControl
        onIncrease={increaseLowSaturationHandler}
        onToggle={toggleLowSaturationHandler}
        onDescrease={decreaseLowSaturationHandler}
      />
    )
  }

  return (
    <WidgetButton
      Icon={HighSaturationIcon}
      titleTranslationKey="colors.lowSaturation"
      title="Low Saturation"
      stats={isLowSaturation ? `${saturation}%` : undefined}
      styleIcon={{ transform: "rotate(180deg)" }}
      elementType={!isLowSaturation ? "button" : "div"}
      isActive={isLowSaturation}
      onToggle={!isLowSaturation ? toggleLowSaturationHandler : undefined}
    >
      {renderControlButtons()}
      {isLowSaturation && (
        <RcSlider
          range
          min={50}
          max={199}
          value={saturation}
          onChange={(e) => {
            onChangeWidgetState((draft) => {
              draft.lowSaturation.saturation = e as number
            })
          }}
        />
      )}
    </WidgetButton>
  )
}

export default LowSaturationButton
