import { Draft } from "immer"
export type ChangeWidgetStateHandler = (d: Draft<WidgetState>) => void

interface TextAlign {
  left: string | null
  center: string | null
  right: string | null
}

export interface WidgetState {
  language: string
  isBlueLightFilter: boolean
  brightness: { isBrightness: boolean; brightness: number }
  isDarkContrast: boolean
  isLightContrast: boolean
  highContrast: { isHighContrast: boolean; contrast: number }
  highSaturation: { isHighSaturation: boolean; saturation: number }
  lowSaturation: { isLowSaturation: boolean; saturation: number }
  isMonochrome: boolean
  color: string
  isVisualImpairment: boolean
  isFontSize: boolean
  adjustFontSizePercentage: number
  textAlign: TextAlign
  isDyslexiaFont: boolean
  isFontWeightBold: boolean
  highlightLinks: boolean
  highlightTitles: boolean
  letterSpacing: number
  lineHeight: { isLineHeight: boolean; lineHeight: number }
  wordSpacing: number
  zoom: { isZoom: boolean; zoom: number }
  isBigCursor: boolean
  showReadingGuide: boolean
}

export type IconSvgComponent =
  | React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  | React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>

export interface AccessibilityTheme {
  primaryColor?: string
  highlightColor?: string
  backgroundColor?: string
  textColor?: string
}

export interface WidgetConfig {
  // Content Panel Widgets
  adjustFontSize?: boolean
  dyslexiaFont?: boolean
  fontWeight?: boolean
  textAlignLeft?: boolean
  textAlignCenter?: boolean
  textAlignRight?: boolean
  highlightLinks?: boolean
  highlightTitles?: boolean
  letterSpacing?: boolean
  lineHeight?: boolean
  wordSpacing?: boolean
  zoom?: boolean

  // Color Panel Widgets
  blueLightFilter?: boolean
  brightness?: boolean
  darkContrast?: boolean
  lightContrast?: boolean
  highContrast?: boolean
  highSaturation?: boolean
  lowSaturation?: boolean
  monochrome?: boolean
  textColorPicker?: boolean
  visualImpairment?: boolean

  // Tools Panel Widgets
  bigCursor?: boolean
  readingGuide?: boolean
}
