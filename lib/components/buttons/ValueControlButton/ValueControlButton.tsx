import { CSSProperties, FC } from "react"
import styles from "components/buttons/ValueControlButton/valueControlButton.module.scss"
import { RotateCcw as RestartAltIcon, Plus as AddIcon, Minus as RemoveIcon } from "lucide-react"
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
