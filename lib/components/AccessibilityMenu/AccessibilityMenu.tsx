import { FC, useEffect, useRef } from "react"
import { WIDGET_MENU_CONTAINER_ID } from "lib/constants"
import Header from "components/Header/Header"
import { WidgetState, ChangeWidgetStateHandler, WidgetConfig } from "lib/types"
import Select from "react-select"
import styled from "components/AccessibilityMenu/accessibilityMenu.module.scss"
import MenuContent from "components/MenuContent/MenuContent"
import { langMap, langOptions } from "lib/config"
import { useTranslation } from "react-i18next"

interface AccessibilityMenuProps {
  nodeListUpdated: number
  display: string
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
  onLangChange: (langCode: string) => void
  onInit: () => void
  onShow: () => void
  showWidget: boolean
  hasLanguages: boolean
  config?: WidgetConfig
}

const AccessibilityMenu: FC<AccessibilityMenuProps> = ({
  widgetState,
  display,
  onInit,
  onLangChange,
  onChangeWidgetState,
  nodeListUpdated,
  onShow,
  showWidget,
  hasLanguages,
  config,
}) => {
  const { t } = useTranslation()
  const { language } = widgetState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>()
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
  }, [])

  return (
    <div id={WIDGET_MENU_CONTAINER_ID} className={styled.a11yAccessibilityMenu}>
      <div style={{ display }} className={styled.a11yMenu}>
        <Header onShow={onShow} />
        <Select
          className={styled["a11y-lang-select-container"]}
          options={hasLanguages ? langOptions : [langOptions[0]]}
          value={langMap[language]}
          onChange={(lang) => lang && onLangChange(lang.value)}
          ref={selectRef}
        />
        <MenuContent nodeListUpdated={nodeListUpdated} widgetState={widgetState} onChangeWidgetState={onChangeWidgetState} config={config} />
        <div className={styled.resetButton}>
          <button onClick={onInit}>{t("resetSettings")}</button>
        </div>
      </div>
      {showWidget && <div className={styled.a11yAccessibilityMenu__overlay}></div>}
    </div>
  )
}

export default AccessibilityMenu
