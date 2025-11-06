import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { Blend as HighSaturationIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import RcSlider from "components/RcSlider/RcSlider"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const styleID = "a11y-high-saturation-style"
const rootClass = "a11y-high-saturation"

interface HighSaturationButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const HighSaturationButton: FC<HighSaturationButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isHighSaturation, saturation } = widgetState.highSaturation

  const increaseHighSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      const { highSaturation } = draft
      if (highSaturation.saturation < 800) {
        draft.highSaturation.saturation++
      }
    })
  }
  const decreaseHighSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      const { highSaturation } = draft
      if (highSaturation.saturation > 200) {
        draft.highSaturation.saturation--
      }
    })
  }
  const toggleHighSaturationHandler = () => {
    onChangeWidgetState((draft) => {
      const isActive = !draft.highSaturation.isHighSaturation
      draft.highSaturation.isHighSaturation = isActive
      draft.highSaturation.saturation = isActive ? 200 : 0
    })
  }

  const renderControlButtons = () => {
    if (!isHighSaturation) return null
    return (
      <ValueControl
        onIncrease={increaseHighSaturationHandler}
        onToggle={toggleHighSaturationHandler}
        onDescrease={decreaseHighSaturationHandler}
      />
    )
  }

  useLayoutEffect(() => {
    if (isHighSaturation) {
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
  }, [isHighSaturation, saturation])

  return (
    <WidgetButton
      Icon={HighSaturationIcon}
      titleTranslationKey="colors.highSaturation"
      title="High Saturation"
      stats={isHighSaturation ? `${saturation}%` : undefined}
      elementType={!isHighSaturation ? "button" : "div"}
      isActive={isHighSaturation}
      onToggle={!isHighSaturation ? toggleHighSaturationHandler : undefined}
    >
      {renderControlButtons()}

      {isHighSaturation && (
        <RcSlider
          range
          min={200}
          max={800}
          value={saturation}
          onChange={(e) => {
            onChangeWidgetState((draft) => {
              draft.highSaturation.saturation = e as number
            })
          }}
        />
      )}
    </WidgetButton>
  )
}

export default HighSaturationButton
