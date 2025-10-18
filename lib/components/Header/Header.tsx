import { FC } from "react"
import CloseIcon from "assets/icons/close.svg?react"
import { useTranslation } from "react-i18next"
import styles from "components/Header/header.module.scss"

interface HeaderProps {
  onShow: () => void
}

const Header: FC<HeaderProps> = ({ onShow }) => {
  const { t } = useTranslation()

  return (
    <header className={styles.widgetHeader}>
      <h3 className={styles.widgetHeader__title}>{t("accessibility-settings")}</h3>
      <button onClick={onShow} className={styles.widgetHeader__closeBtn}>
        <CloseIcon />
      </button>
    </header>
  )
}

export default Header
