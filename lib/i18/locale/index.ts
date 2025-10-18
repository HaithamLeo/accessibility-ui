import englishTranslation from "i18/locale/english.json"
import arabicTranslation from "i18/locale/arabic.json"

export type Translation = {
  translation: string
}
export type Resources = Record<string, Translation>

export const languageArray = [
  { lang: "en", name: "english", translation: englishTranslation },
  { lang: "ar", name: "arabic", translation: arabicTranslation },
]

export const getLanguagePromises = () => {
  return languageArray.map((langObj) => Promise.resolve(langObj.translation))
}

export const languages = ["en", "ar"]
export const rtlLanguages = ["ar"]
