import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
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
}
const ContentPanel: FC<ContentPanelProps> = ({ nodeListUpdated, widgetState, onChangeWidgetState }) => {
  return (
    <>
      <AdjustFontSize nodeListUpdated={nodeListUpdated} widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <DyslexiaFontButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <FontWeightButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <AlignTextButton
        widgetState={widgetState}
        onChangeWidgetState={onChangeWidgetState}
        direction="left"
        translationKey="content.textAlignLeft"
      />
      <AlignTextButton
        widgetState={widgetState}
        onChangeWidgetState={onChangeWidgetState}
        direction="center"
        translationKey="content.textAlignCenter"
      />
      <AlignTextButton
        widgetState={widgetState}
        onChangeWidgetState={onChangeWidgetState}
        direction="right"
        translationKey="content.textAlignRight"
      />
      <HighlightLinksButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <HighlightTitlesButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <LetterSpacingButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <WordSpacingButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <LineHeightButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <ZoomButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
    </>
  )
}
export default ContentPanel
