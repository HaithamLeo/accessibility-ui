import { FC, useLayoutEffect } from "react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import { ImageOff } from "lucide-react"

const styleID = "a11y-hide-images-style"
const rootClass = "a11y-hide-images"

interface HideImagesButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const HideImagesButton: FC<HideImagesButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isHideImages } = widgetState

  const toggleHideImagesHandler = () => {
    onChangeWidgetState((draft) => {
      draft.isHideImages = !draft.isHideImages
    })
  }

  useLayoutEffect(() => {
    if (isHideImages) {
      document.documentElement.classList.add(rootClass)

      // Check if style already exists to avoid duplicates
      let style = document.getElementById(styleID) as HTMLStyleElement
      if (!style) {
        style = document.createElement("style")
        style.id = styleID
        style.innerHTML = `
        html.${rootClass} img {
          visibility: hidden !important;
        }
      `
        document.head.appendChild(style)
      }
    } else {
      // Only cleanup if it was previously active
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }

    // Cleanup on unmount
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [isHideImages])

  return (
    <WidgetButton
      Icon={ImageOff}
      isToggled={isHideImages}
      onToggle={toggleHideImagesHandler}
      titleTranslationKey="tools.hideImages"
      title="Hide Images"
    />
  )
}

export default HideImagesButton
