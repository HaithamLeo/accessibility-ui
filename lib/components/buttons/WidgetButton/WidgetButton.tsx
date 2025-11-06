import { FC, ReactNode } from "react"
import classNames from "classnames"
import { IconSvgComponent } from "lib/types"
import { useTranslation } from "react-i18next"
import styles from "components/buttons/WidgetButton/widgetButton.module.scss"
import { CircleHelp as QuestionMarkIcon } from "lucide-react"

interface DynamicButtonProps {
  children: ReactNode
  elementType: string
  [key: string]: unknown
}

const DynamicButton: FC<DynamicButtonProps> = ({ elementType, children, ...rest }) => {
  const Element = elementType === "button" ? "button" : "div"
  const tabIndex = elementType === "div" ? 0 : undefined
  return (
    <Element tabIndex={tabIndex} {...rest}>
      {children}
    </Element>
  )
}

interface WidgetButtonProps {
  Icon: IconSvgComponent
  isToggled?: boolean
  isActive?: boolean
  children?: ReactNode
  onToggle?: () => void
  titleTranslationKey: string
  elementType?: string
  title?: string
  stats?: number | string
  styleIcon?: { [x: string]: unknown }
  styleTitle?: { [x: string]: unknown }
  className?: string
  tooltipTranslationKey?: string
}
const WidgetButton: FC<WidgetButtonProps> = ({
  Icon,
  isToggled,
  isActive,
  children,
  onToggle,
  titleTranslationKey,
  elementType = "button",
  title,
  stats,
  styleIcon,
  styleTitle,
  className,
  tooltipTranslationKey,
}) => {
  const { t } = useTranslation()
  const containerClass = classNames(`${styles.widgetButton} ${className}`, {
    [styles.isToggled]: isToggled,
    [styles.isActive]: isActive,
  })

  const renderTooltip = () => {
    if (!tooltipTranslationKey) return null
    return (
      <>
        <QuestionMarkIcon className={`${styles.widgetButton__icon} ${styles["widgetButton__icon--help"]}`} />
        <span data-tooltip={t(tooltipTranslationKey ?? "") ?? undefined}></span>
      </>
    )
  }

  return (
    <DynamicButton elementType={elementType} onClick={onToggle} className={containerClass}>
      {stats && <span className={styles.widgetButton__stats}>{stats}</span>}
      {renderTooltip()}

      <Icon style={styleIcon} className={styles.widgetButton__icon} aria-label={title} />
      <h2 style={styleTitle} className={styles.widgetButton__title}>
        {t(titleTranslationKey)}
      </h2>
      <div className={styles.widgetButton__content}>{children}</div>
    </DynamicButton>
  )
}

export default WidgetButton
