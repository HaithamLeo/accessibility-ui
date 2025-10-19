import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler, WidgetConfig } from "lib/types"
import AdjustFontSize from "components/buttons/content/AdjustFontSize/AdjustFontSize"
import DyslexiaFontButton from "components/buttons/content/DyslexiaFontButton/DyslexiaFontButton"
import FontWeightButton from "components/buttons/content/FontWeightButton/FontWeightButton"
import AlignTextButton from "components/buttons/content/AlignTextButton/AlignTextButton"
import HighlightLinksButton from "components/buttons/content/HighlightLinksButton/HighlightLinksButton"
import HighlightTitlesButton from "components/buttons/content/HighlightTitlesButton/HighlightTitlesButton"
import LetterSpacingButton from "components/buttons/content/LetterSpacingButton/LetterSpacingButton"
import WordSpacingButton from "components/buttons/content/WordSpacingButton/WordSpacingButton"
import LineHeightButton from "components/buttons/content/LineHeightButton/LineHeightButton"
import ZoomButton from "components/buttons/content/ZoomButton/ZoomButton"

interface ContentPanelProps {
  nodeListUpdated: number
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
  config?: WidgetConfig
}
const ContentPanel: FC<ContentPanelProps> = ({ nodeListUpdated, widgetState, onChangeWidgetState, config }) => {
  return (
    <>
      {(config?.adjustFontSize !== false) && <AdjustFontSize nodeListUpdated={nodeListUpdated} widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.dyslexiaFont !== false) && <DyslexiaFontButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.fontWeight !== false) && <FontWeightButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.textAlignLeft !== false) && <AlignTextButton
        widgetState={widgetState}
        onChangeWidgetState={onChangeWidgetState}
        direction="left"
        translationKey="content.textAlignLeft"
      />}
      {(config?.textAlignCenter !== false) && <AlignTextButton
        widgetState={widgetState}
        onChangeWidgetState={onChangeWidgetState}
        direction="center"
        translationKey="content.textAlignCenter"
      />}
      {(config?.textAlignRight !== false) && <AlignTextButton
        widgetState={widgetState}
        onChangeWidgetState={onChangeWidgetState}
        direction="right"
        translationKey="content.textAlignRight"
      />}
      {(config?.highlightLinks !== false) && <HighlightLinksButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.highlightTitles !== false) && <HighlightTitlesButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.letterSpacing !== false) && <LetterSpacingButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.wordSpacing !== false) && <WordSpacingButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.lineHeight !== false) && <LineHeightButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
      {(config?.zoom !== false) && <ZoomButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />}
    </>
  )
}
export default ContentPanel
