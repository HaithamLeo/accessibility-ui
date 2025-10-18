import { FC, useLayoutEffect } from "react"
import styled from "components/buttons/colors/BrightnessControl/BrightnessControl.module.scss"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import LightModeSharpIcon from "assets/icons/brightness.svg?react"
import ValueControlButton from "components/buttons/ValueControlButton/ValueControlButton"
import RcSlider from "components/RcSlider/RcSlider"

const styleID = "a11y-brightness-control-style"
const rootClass = "a11y-brightness-control"

interface BrightnessControlProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const BrightnessControl: FC<BrightnessControlProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isBrightness, brightness } = widgetState.brightness

  const increaseBrightnessHandler = () => {
    onChangeWidgetState((draft) => {
      const { brightness } = draft
      if (brightness.brightness < 500) {
        draft.brightness.brightness++
      }
    })
  }
  const decreaseBrightnessHandler = () => {
    onChangeWidgetState((draft) => {
      const { brightness } = draft
      if (brightness.brightness > 100) {
        draft.brightness.brightness--
      }
    })
  }
  const toggleBrightnessHandler = () => {
    onChangeWidgetState((draft) => {
      const isActive = !draft.brightness.isBrightness
      draft.brightness.isBrightness = isActive
      draft.brightness.brightness = isActive ? 150 : 0
    })
  }

  useLayoutEffect(() => {
    if (isBrightness) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: brightness(${brightness}%) !important;
                    -ms-filter: brightness(${brightness}%) !important;
                    -moz-filter: brightness(${brightness}%) !important;
                    -webkit-filter: brightness(${brightness}%) !important;
                    filter: brightness(${brightness}%) !important;
                }
            `
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isBrightness, brightness])

  const renderControlButtons = () => {
    if (!isBrightness) return null
    return (
      <div className={styled.accBrightnessControl}>
        <ValueControlButton onClick={increaseBrightnessHandler} controlType="increase" />

        <ValueControlButton onClick={toggleBrightnessHandler} controlType="init" />

        <ValueControlButton onClick={decreaseBrightnessHandler} controlType="decrease" />
      </div>
    )
  }

  return (
    <WidgetButton
      Icon={LightModeSharpIcon}
      titleTranslationKey="colors.brightnessControl"
      title="Brightness Control"
      elementType={!isBrightness ? "button" : "div"}
      isActive={isBrightness}
      onToggle={!isBrightness ? toggleBrightnessHandler : undefined}
      stats={isBrightness ? `${brightness}%` : undefined}
    >
      {renderControlButtons()}
      {isBrightness && (
        <RcSlider
          range
          min={150}
          max={500}
          value={brightness}
          onChange={(e) => {
            onChangeWidgetState((draft) => {
              draft.brightness.brightness = e as number
            })
          }}
        />
      )}
    </WidgetButton>
  )
}

export default BrightnessControl
