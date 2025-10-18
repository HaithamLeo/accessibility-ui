import { FC } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import BigCursorButton from "components/buttons/tools/BigCursorButton/BigCursorButton"
import ReadingGuide from "components/buttons/tools/ReadingGuide/ReadingGuide"

interface ToolsPanelProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const ToolsPanel: FC<ToolsPanelProps> = ({ widgetState, onChangeWidgetState }) => {
  return (
    <>
      <BigCursorButton widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
      <ReadingGuide widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
    </>
  )
}
export default ToolsPanel
