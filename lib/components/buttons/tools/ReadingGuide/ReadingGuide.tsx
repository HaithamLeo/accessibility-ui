import { FC, useEffect, useMemo, useState } from "react"
import Portal from "components/Portal/Portal"
import ReadingGuideIcon from "assets/icons/readingGuide.svg?react"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import styles from "components/buttons/tools/ReadingGuide/readingGuide.module.scss"

const READING_GUIDE_PORTAL_ID = "a11y-portal-[readingGuide-container]"

interface ReadingGuideProps {
  rgGap?: number
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}
const ReadingGuide: FC<ReadingGuideProps> = ({ rgGap = 100, widgetState, onChangeWidgetState }) => {
  const { showReadingGuide } = widgetState
  const [mouseY, setMouseY] = useState(0)
  const height = useMemo(() => {
    if (mouseY > 0) {
      return `calc(100vh - ${mouseY}px - ${rgGap}px)`
    }
    return 0
  }, [mouseY, rgGap])

  useEffect(() => {
    if (showReadingGuide) {
      const handleMouseMove = (event: MouseEvent) => {
        setMouseY(event.clientY)
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [showReadingGuide])

  const toggleReadingGuideHandler = () => {
    onChangeWidgetState((draft) => {
      draft.showReadingGuide = !draft.showReadingGuide
    })
  }

  const renderReadingGuide = () => {
    if (!showReadingGuide) return null
    return (
      <Portal wrapperElementId={READING_GUIDE_PORTAL_ID}>
        <div className={styles["a11y-readingGuide"]} style={{ height: mouseY }}></div>
        <div className={styles["a11y-readingGuide"]} style={{ top: "auto", bottom: 0, height }}></div>
      </Portal>
    )
  }

  return (
    <>
      <WidgetButton
        Icon={ReadingGuideIcon}
        isToggled={showReadingGuide}
        onToggle={toggleReadingGuideHandler}
        titleTranslationKey="tools.readingGuide"
        title="Reading Guide"
      />
      {renderReadingGuide()}
    </>
  )
}

export default ReadingGuide
