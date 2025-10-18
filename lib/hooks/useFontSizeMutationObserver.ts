import { useLayoutEffect, useState } from "react"
import { getComputedStyleAndSetWidgetDataFontSize, isRuleAppliedToElement } from "lib/utils"
import { WIDGET_APP_ID, WIDGET_PORTAL_ID, textTags } from "lib/constants"

const useFontSizeMutationObserver = () => {
  const [nodeListUpdated, setNodeListUpdated] = useState(0)
  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.id === WIDGET_PORTAL_ID || node.id === WIDGET_APP_ID) return

              // handle inline font size
              if (node.style.fontSize) {
                getComputedStyleAndSetWidgetDataFontSize(node)
                node.dataset.a11yMutation = `true`
                setNodeListUpdated((p) => ++p)
              }
              // handle font size from css files
              Array.from(document.styleSheets).forEach((sheet) => {
                try {
                  Array.from(sheet.cssRules || []).forEach((rule) => {
                    const _rule = rule as CSSStyleRule
                    if (_rule.style.fontSize && isRuleAppliedToElement(node, _rule)) {
                      getComputedStyleAndSetWidgetDataFontSize(node)
                      node.dataset.a11yMutation = `true`
                      setNodeListUpdated((p) => ++p)
                    }
                  })
                } catch (error) {
                  //
                }
              })
              // handle textTags that the font size was not defined
              if (node) {
                const tag = node.tagName.toLowerCase()
                if (textTags.includes(tag)) {
                  getComputedStyleAndSetWidgetDataFontSize(node)
                  node.dataset.a11yMutation = `true`
                  setNodeListUpdated((p) => ++p)
                }
              }
            }
          })
        }
      })
    })

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true })

    // Clean up
    return () => {
      setNodeListUpdated(0)
      observer.disconnect()
    }
  }, [nodeListUpdated])

  return nodeListUpdated
}

export default useFontSizeMutationObserver
