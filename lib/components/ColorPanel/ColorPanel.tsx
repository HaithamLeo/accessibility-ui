import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler, WidgetConfig } from "lib/types"
import BlueLightFilterButton from "components/buttons/colors/BlueLightFilterButton/BlueLightFilterButton"
import BrightnessControl from "components/buttons/colors/BrightnessControl/BrightnessControl"
import DarkContrastButton from "components/buttons/colors/DarkContrastButton/DarkContrastButton"
import HighContrastButton from "components/buttons/colors/HighContrastButton/HighContrastButton"
import HighSaturationButton from "components/buttons/colors/HighSaturationButton/HighSaturationButton"
import LightContrastButton from "components/buttons/colors/LightContrastButton/LightContrastButton"
import LowSaturationButton from "components/buttons/colors/LowSaturationButton/LowSaturationButton"
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
      {(config?.lightContrast !== false) && <LightContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.darkContrast !== false) && <DarkContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.highContrast !== false) && <HighContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.brightness !== false) && <BrightnessControl widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.highSaturation !== false) && <HighSaturationButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.lowSaturation !== false) && <LowSaturationButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.monochrome !== false) && <MonochromeButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.visualImpairment !== false) && <VisualImpairmentButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.textColorPicker !== false) && <TextColorPickerButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
    </>
  )
}
export default ColorPanel
