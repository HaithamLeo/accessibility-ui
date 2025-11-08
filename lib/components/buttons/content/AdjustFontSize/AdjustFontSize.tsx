import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { Type } from "lucide-react"
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
  const { adjustFontSizePercentage, isFontSize } = widgetState

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

  const fontSizeToggleHandler = () => {
    onChangeWidgetState((draft) => {
      const isActive = !draft.isFontSize
      draft.isFontSize = isActive
      draft.adjustFontSizePercentage = isActive ? 120 : 100
    })
  }

  const initFontSizeHandler = () => {
    onChangeWidgetState((draft) => {
      draft.adjustFontSizePercentage = 100
      draft.isFontSize = false
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

  const renderControlButtons = () => {
    if (!isFontSize) return null
    return (
      <ValueControl
        onIncrease={increaseFontSizeHandler}
        onToggle={initFontSizeHandler}
        onDescrease={decreaseFontSizeHandler}
      />
    )
  }

  return (
    <WidgetButton
      Icon={Type}
      titleTranslationKey={"content.adjustFontSize"}
      title="Adjust Font Size"
      elementType={!isFontSize ? "button" : "div"}
      isActive={isFontSize}
      onToggle={!isFontSize ? fontSizeToggleHandler : undefined}
      stats={isFontSize ? `${adjustFontSizePercentage}%` : undefined}
    >
      {renderControlButtons()}
    </WidgetButton>
  )
}

export default AdjustFontSize
