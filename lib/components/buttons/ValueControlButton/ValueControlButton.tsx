import { CSSProperties, FC } from "react"
import styles from "components/buttons/ValueControlButton/valueControlButton.module.scss"
import { RotateCcw, Plus, Minus } from "lucide-react"
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
      Icon = Plus
      break
    case "decrease":
      Icon = Minus
      break
    case "init":
      Icon = RotateCcw
      break
    default:
      Icon = RotateCcw
  }

  return (
    <button style={style} onClick={onClick} className={styles.valueControlButton}>
      <Icon />
    </button>
  )
}

export default ValueControlButton
