import { FC } from "react"
import styles from "components/buttons/ValueControl/valueControl.module.scss"
import ValueControlButton from "components/buttons/ValueControlButton/ValueControlButton"

interface ValueControlProps {
  onIncrease: () => void
  onToggle: () => void
  onDescrease: () => void
}
const ValueControl: FC<ValueControlProps> = ({ onIncrease, onToggle, onDescrease }) => {
  return (
    <div className={styles.valueControl}>
      <ValueControlButton onClick={onDescrease} controlType="decrease" />
      <ValueControlButton onClick={onToggle} controlType="init" />
      <ValueControlButton onClick={onIncrease} controlType="increase" />
    </div>
  )
}

export default ValueControl
