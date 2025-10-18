import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import HighContrastIcon from "assets/icons/highcontrast.svg?react"
import RcSlider from "components/RcSlider/RcSlider"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const styleID = "a11y-high-contrast-style"
const rootClass = "a11y-high-contrast"

interface HighContrastButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const HighContrastButton: FC<HighContrastButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isHighContrast, contrast } = widgetState.highContrast

  useLayoutEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: contrast(${contrast}%) !important;
                    -ms-filter: contrast(${contrast}%) !important;
                    -moz-filter: contrast(${contrast}%) !important;
                    -webkit-filter: contrast(${contrast}%) !important;
                    filter: contrast(${contrast}%) !important;
                }
            `
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isHighContrast, contrast])

  const increaseHighContrastHandler = () => {
    onChangeWidgetState((draft) => {
      const { highContrast } = draft
      if (highContrast.contrast < 200) {
        draft.highContrast.contrast++
      }
    })
  }
  const decreaseHighContrastHandler = () => {
    onChangeWidgetState((draft) => {
      const { highContrast } = draft
      if (highContrast.contrast > 100) {
        draft.highContrast.contrast--
      }
    })
  }
  const toggleHighContrastHandler = () => {
    onChangeWidgetState((draft) => {
      const isActive = !draft.highContrast.isHighContrast
      draft.highContrast.isHighContrast = isActive
      draft.highContrast.contrast = isActive ? 125 : 0
    })
  }

  const renderControlButtons = () => {
    if (!isHighContrast) return null
    return (
      <ValueControl
        onIncrease={increaseHighContrastHandler}
        onToggle={toggleHighContrastHandler}
        onDescrease={decreaseHighContrastHandler}
      />
    )
  }

  return (
    <WidgetButton
      Icon={HighContrastIcon}
      titleTranslationKey="colors.highContrast"
      title="High Contrast"
      stats={isHighContrast ? `${contrast}%` : undefined}
      elementType={!isHighContrast ? "button" : "div"}
      isActive={isHighContrast}
      onToggle={!isHighContrast ? toggleHighContrastHandler : undefined}
    >
      {renderControlButtons()}

      {isHighContrast && (
        <RcSlider
          range
          min={125}
          max={200}
          value={contrast}
          onChange={(e) => {
            onChangeWidgetState((draft) => {
              draft.highContrast.contrast = e as number
            })
          }}
        />
      )}
    </WidgetButton>
  )
}

export default HighContrastButton
