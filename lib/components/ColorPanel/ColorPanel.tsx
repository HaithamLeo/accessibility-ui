import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
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
}

const ColorPanel: FC<ColorPanelProps> = ({ widgetState, onChangeWidgetState }) => {
  return (
    <>
      <BlueLightFilterButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <LightContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <DarkContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <HighContrastButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <BrightnessControl widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <HighSaturationButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <LowSaturationButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <MonochromeButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <VisualImpairmentButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <TextColorPickerButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
    </>
  )
}
export default ColorPanel
