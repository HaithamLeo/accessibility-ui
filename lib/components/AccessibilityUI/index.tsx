import { FC, useEffect, useState } from "react"
import { useSessionStorage } from "@uidotdev/usehooks"
import { produce } from "immer"
import AccessibilityButton from "components/buttons/AccessibilityButton/AccessibilityButton"
import AccessibilityMenu from "components/AccessibilityMenu/AccessibilityMenu"
import useFontSizeTraverse from "hooks/useFontSizeTraverse"
import useFontSizeMutationObserver from "hooks/useFontSizeMutationObserver"
import "../../index.css"
import { WIDGET_APP_ID, WIDGET_PORTAL_ID } from "lib/constants"
import LanguageDetector from "i18next-browser-languagedetector"
import Portal from "components/Portal/Portal"
import i18n from "i18next"
import { WidgetState, ChangeWidgetStateHandler, WidgetConfig } from "lib/types"
import { getInitialWidgetState } from "lib/utils"
import { initReactI18next } from "react-i18next"
import { Resources, getLanguagePromises, languageArray, languages, rtlLanguages } from "i18/locale"
import en from "i18/locale/en.json"

// Initialize i18next immediately with default resources
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  })

const WIDGET_STORAGE_KEY = "a11y-widget-state"

interface AccessibilityUIProps {
  config?: WidgetConfig
}

const AccessibilityUI: FC<AccessibilityUIProps> = ({ config }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasLanguages, setHasLanguages] = useState(false)
  useFontSizeTraverse()
  const nodeListUpdated = useFontSizeMutationObserver()
  const [widgetState, setWidgetState] = useSessionStorage<WidgetState>(WIDGET_STORAGE_KEY, getInitialWidgetState())
  const [showWidget, setShowWidget] = useState(false)
  const direction = rtlLanguages.includes(widgetState.language) ? "rtl" : "ltr"

  const changeLanguageHandler = (langCode: string) => {
    i18n.changeLanguage(langCode, () => {
      setWidgetState((p) => {
        return produce(p, (draft) => {
          draft.language = langCode
        })
      })
    })
  }
  const changeWidgetStateHandler = (fn: ChangeWidgetStateHandler) => {
    setWidgetState((p) => {
      return produce(p, fn)
    })
  }

  const initWidgetStateHandler = () => {
    setWidgetState(getInitialWidgetState())
  }
  const renderWidgetHandler = () => {
    setShowWidget((p) => !p)
  }

  useEffect(() => {
    const promises = getLanguagePromises()
    const resources: Resources = {}
    Promise.all(promises)
      .then((langs) => {
        languageArray.forEach((item, index) => {
          resources[item.lang] = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            translation: langs[index] as any,
          }
        })
        // Add additional language resources to existing i18n instance
        languageArray.forEach((item, index) => {
          if (item.lang !== "en") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            i18n.addResourceBundle(item.lang, "translation", langs[index] as any)
          }
        })
        i18n.languages = languages
        setHasLanguages(true)
      })
      .catch(() => {
        // Already initialized with English fallback
        console.warn("Failed to load additional languages")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Portal wrapperElementId={WIDGET_PORTAL_ID}>
      <div id={WIDGET_APP_ID} style={{ direction, fontSize: 50 }} data-a11y-language={widgetState.language}>
        <AccessibilityButton onShow={renderWidgetHandler} />

        {!isLoading && (
          <AccessibilityMenu
            display={showWidget ? "block" : "none"}
            showWidget={showWidget}
            widgetState={widgetState}
            onLangChange={changeLanguageHandler}
            onChangeWidgetState={changeWidgetStateHandler}
            onInit={initWidgetStateHandler}
            nodeListUpdated={nodeListUpdated}
            onShow={renderWidgetHandler}
            hasLanguages={hasLanguages}
            config={config}
          />
        )}
      </div>
    </Portal>
  )
}

export default AccessibilityUI
