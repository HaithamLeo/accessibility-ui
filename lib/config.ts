export const langOptions = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
]

export const langMap = langOptions.reduce((widgetState, item) => {
  widgetState[item.value] = item
  return widgetState
}, {} as Record<string, { label: string; value: string }>)
