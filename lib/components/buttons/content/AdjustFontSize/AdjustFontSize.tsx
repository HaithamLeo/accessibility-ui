import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { ALargeSmall as TextIncreaseIcon } from "lucide-react"
import ValueControl from "components/buttons/ValueControl/ValueControl"

const getNodesByDataAttrAndAdjustFontSize = (dataAttr: string, percentage: number) => {
  const elements = document.querySelectorAll(`[${dataAttr}]`)
  elements.forEach((elem) => {
    if (elem && elem instanceof HTMLElement && elem.dataset.a11yOrgfontsize) {
      const prevFontSize = +elem.dataset.a11yOrgfontsize
      const newFontSize = (prevFontSize * percentage) / 100
      elem.style.fontSize = `${newFontSize}px`
    }
  })
}

interface AdjustFontSizeProps {
  nodeListUpdated: number
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const AdjustFontSize: FC<AdjustFontSizeProps> = ({ nodeListUpdated, widgetState, onChangeWidgetState }) => {
  const { adjustFontSizePercentage } = widgetState

  const increaseFontSizeHandler = () => {
    onChangeWidgetState((draft) => {
      const { adjustFontSizePercentage } = draft
      if (adjustFontSizePercentage < 200) {
        draft.adjustFontSizePercentage += 10
      }
    })
  }
  const decreaseFontSizeHandler = () => {
    onChangeWidgetState((draft) => {
      const { adjustFontSizePercentage } = draft
      if (adjustFontSizePercentage > 10) {
        draft.adjustFontSizePercentage -= 10
      }
    })
  }
  const initFontSizeHandler = () => {
    onChangeWidgetState((draft) => {
      draft.adjustFontSizePercentage = 100
    })
  }

  useLayoutEffect(() => {
    if (nodeListUpdated > 0) {
      getNodesByDataAttrAndAdjustFontSize("data-a11y-mutation", adjustFontSizePercentage)
    }
  }, [adjustFontSizePercentage, nodeListUpdated])

  useLayoutEffect(() => {
    getNodesByDataAttrAndAdjustFontSize("data-a11y-orgfontsize", adjustFontSizePercentage)
  }, [adjustFontSizePercentage])

  return (
    <WidgetButton
      elementType="div"
      Icon={TextIncreaseIcon}
      titleTranslationKey={"content.adjustFontSize"}
      title="Adjust Font Size"
      stats={`${adjustFontSizePercentage}%`}
    >
      <ValueControl
        onIncrease={increaseFontSizeHandler}
        onToggle={initFontSizeHandler}
        onDescrease={decreaseFontSizeHandler}
      />
    </WidgetButton>
  )
}

export default AdjustFontSize
