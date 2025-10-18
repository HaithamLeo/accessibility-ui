import { useLayoutEffect, useState } from "react"
import { getComputedStyleAndSetWidgetDataFontSize, isRuleAppliedToElement } from "lib/utils"
import { textTags } from "lib/constants"

const useFontSizeTraverse = () => {
  const [isTraversing, setIsTraversing] = useState(true)

  useLayoutEffect(() => {
    const allElements = document.querySelectorAll("*")

    allElements.forEach((element) => {
      const elem = element as HTMLElement
      // Check inline styles
      if (elem.style.fontSize) {
        getComputedStyleAndSetWidgetDataFontSize(elem)
      }

      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          Array.from(sheet.cssRules || []).forEach((rule) => {
            const _rule = rule as CSSStyleRule
            if (_rule.style.fontSize && isRuleAppliedToElement(elem, _rule)) {
              getComputedStyleAndSetWidgetDataFontSize(elem)
            }
          })
        } catch (error) {
          //
        }
      })

      //element has no font size inline or stylesheet
      if (elem) {
        const tag = elem.tagName.toLowerCase()
        if (textTags.includes(tag)) {
          getComputedStyleAndSetWidgetDataFontSize(elem)
        }
      }
    })

    setIsTraversing(false)
  }, [])
  return isTraversing
}

export default useFontSizeTraverse
