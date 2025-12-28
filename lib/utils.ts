import i18n from "i18next"
import { WidgetState } from "lib/types"

export const isRuleAppliedToElement = (element: HTMLElement, rule: CSSStyleRule): boolean => {
  const matchingElements = document.querySelectorAll(rule.selectorText)
  return Array.from(matchingElements).includes(element)
}

export const getComputedStyleAndSetWidgetDataFontSize = (elem: HTMLElement) => {
  const { fontSize } = window.getComputedStyle(elem)
  elem.dataset.a11yOrgfontsize = parseFloat(fontSize).toString()
  elem.style.fontSize = fontSize
}

export const getDataImageSvgBase64 = (svg: string) => `data:image/svg+xml;base64,${window.btoa(svg)}`

export const getInitialWidgetState = (): WidgetState => {
  // Check if we're running in a browser environment (client-side)
  const isClient = typeof window !== "undefined" && typeof window.localStorage !== "undefined"

  return {
    language: isClient ? window.localStorage.getItem("i18nextLng") ?? i18n.language : i18n.language,
    isBlueLightFilter: false,
    brightness: { isBrightness: false, brightness: 150 },
    contrastMode: { isContrastMode: false, mode: null },
    highContrast: { isHighContrast: false, contrast: 125 },
    saturation: { isSaturation: false, saturation: 100 },
    isMonochrome: false,
    color: "",
    isVisualImpairment: false,
    isFontSize: false,
    adjustFontSizePercentage: 100,
    textAlign: null,
    isDyslexiaFont: false,
    isFontWeightBold: false,
    highlightLinks: false,
    highlightTitles: false,
    letterSpacing: 0,
    lineHeight: { isLineHeight: false, lineHeight: 0 },
    wordSpacing: 0,
    zoom: { isZoom: false, zoom: 1 },
    isBigCursor: false,
    showReadingGuide: false,
    isHideImages: false,
  }
}
