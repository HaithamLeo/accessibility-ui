import { CSSProperties, FC } from "react"
import styles from "components/buttons/ValueControlButton/valueControlButton.module.scss"
import RestartAltIcon from "assets/icons/init.svg?react"
import AddIcon from "assets/icons/add.svg?react"
import RemoveIcon from "assets/icons/remove.svg?react"
import { IconSvgComponent } from "lib/types"

export type ValueControlType = "init" | "increase" | "decrease"
interface ValueControlButtonProps {
  controlType: ValueControlType
  onClick?: () => void
  style?: CSSProperties
}

const ValueControlButton: FC<ValueControlButtonProps> = ({ controlType, onClick, style }) => {
  let Icon: IconSvgComponent
  switch (controlType) {
    case "increase":
      Icon = AddIcon
      break
    case "decrease":
      Icon = RemoveIcon
      break
    case "init":
      Icon = RestartAltIcon
      break
    default:
      Icon = RestartAltIcon
  }

  return (
    <button style={style} onClick={onClick} className={styles.valueControlButton}>
      <Icon />
    </button>
  )
}

export default ValueControlButton
