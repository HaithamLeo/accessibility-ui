import { FC } from "react"
import ContentPanel from "components/ContentPanel/ContentPanel"
import ColorPanel from "components/ColorPanel/ColorPanel"
import ToolsPanel from "components/ToolsPanel/ToolsPanel"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import styled from "components/MenuContent/menuContent.module.scss"
import { useTranslation } from "react-i18next"

interface MenuContentProps {
  nodeListUpdated: number
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const MenuContent: FC<MenuContentProps> = ({ nodeListUpdated, widgetState, onChangeWidgetState }) => {
  const { t } = useTranslation()

  return (
    <div className={styled.menuContent}>
      <div>
        <h3 className={styled.title}>{t("content.title")}</h3>
        <div className={styled.widgetGrid}>
          <ContentPanel nodeListUpdated={nodeListUpdated} widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
        </div>
      </div>
      <div className={styled.block}>
        <h3 className={styled.title}>{t("colors.title")}</h3>
        <div className={styled.widgetGrid}>
          <ColorPanel widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
        </div>
      </div>

      <div className={styled.block}>
        <h3 className={styled.title}>{t("tools.title")}</h3>
        <div className={styled.widgetGrid}>
          <ToolsPanel widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} />
        </div>
      </div>
    </div>
  )
}

export default MenuContent
