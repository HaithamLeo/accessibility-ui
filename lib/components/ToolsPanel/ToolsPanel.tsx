import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler, WidgetConfig } from "lib/types"
import BigCursorButton from "components/buttons/tools/BigCursorButton/BigCursorButton"
import ReadingGuide from "components/buttons/tools/ReadingGuide/ReadingGuide"
import HideImagesButton from "components/buttons/tools/HideImagesButton/HideImagesButton"

interface ToolsPanelProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
  config?: WidgetConfig
}

const ToolsPanel: FC<ToolsPanelProps> = ({ widgetState, onChangeWidgetState, config }) => {
  return (
    <>
      {config?.bigCursor !== false && (
        <BigCursorButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      )}
      {config?.readingGuide !== false && (
        <ReadingGuide widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      )}
      {config?.hideImages !== false && (
        <HideImagesButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      )}
    </>
  )
}
export default ToolsPanel
