import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler, WidgetConfig } from "lib/types"
import BlueLightFilterButton from "components/buttons/colors/BlueLightFilterButton/BlueLightFilterButton"
import BrightnessControl from "components/buttons/colors/BrightnessControl/BrightnessControl"
import ContrastModeButton from "components/buttons/colors/ContrastModeButton/ContrastModeButton"
import HighContrastButton from "components/buttons/colors/HighContrastButton/HighContrastButton"
import SaturationButton from "components/buttons/colors/SaturationButton/SaturationButton"
import MonochromeButton from "components/buttons/colors/MonochromeButton/MonochromeButton"
import TextColorPickerButton from "components/buttons/colors/TextColorPickerButton/TextColorPickerButton"
import VisualImpairmentButton from "components/buttons/colors/VisualImpairmentButton/VisualImpairmentButton"

interface ColorPanelProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
  config?: WidgetConfig
}

const ColorPanel: FC<ColorPanelProps> = ({ widgetState, onChangeWidgetState, config }) => {
  return (
    <>
      {(config?.blueLightFilter !== false) && <BlueLightFilterButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.contrastMode !== false) && <ContrastModeButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.highContrast !== false) && <HighContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.brightness !== false) && <BrightnessControl widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.saturation !== false) && <SaturationButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.monochrome !== false) && <MonochromeButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.visualImpairment !== false) && <VisualImpairmentButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.textColorPicker !== false) && <TextColorPickerButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
    </>
  )
}
export default ColorPanel
