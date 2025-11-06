import { FC, useLayoutEffect } from "react"
import styled from "components/buttons/content/ZoomButton/ZoomButton.module.scss"
import { WIDGET_PORTAL_ID } from "lib/constants"
import { WidgetState, ChangeWidgetStateHandler } from "lib/types"
import { ZoomIn as ZoomInIcon } from "lucide-react"
import WidgetButton from "components/buttons/WidgetButton/WidgetButton"
import ValueControlButton from "components/buttons/ValueControlButton/ValueControlButton"

const styleID = "a11y-zoom-style"
const rootClass = "a11y-zoom"

interface ZoomButtonProps {
  widgetState: WidgetState
  onChangeWidgetState: (fn: ChangeWidgetStateHandler) => void
}

const ZoomButton: FC<ZoomButtonProps> = ({ widgetState, onChangeWidgetState }) => {
  const { isZoom, zoom } = widgetState.zoom

  const increaseZoomHandler = () => {
    onChangeWidgetState((draft) => {
      draft.zoom.isZoom = true
      draft.zoom.zoom += 0.1
    })
  }
  const decreaseZoomHandler = () => {
    onChangeWidgetState((draft) => {
      if (draft.zoom.zoom > 0.1) {
        draft.zoom.isZoom = true
        draft.zoom.zoom -= 0.1
      }
    })
  }
  const zoomInitHandler = () => {
    onChangeWidgetState((draft) => {
      draft.zoom.isZoom = false
      draft.zoom.zoom = 1
    })
  }

  useLayoutEffect(() => {
    if (zoom && isZoom) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style")
      style.id = styleID
      style.innerHTML = `
                html.${rootClass} body *:not(#${WIDGET_PORTAL_ID}, #${WIDGET_PORTAL_ID} *) {
                zoom: ${zoom.toFixed(1)} !important;
               }
            `
      document.head.appendChild(style)
    }
    return () => {
      const style = document.getElementById(styleID)
      document.documentElement.classList.remove(rootClass)
      style?.remove()
    }
  }, [zoom, isZoom])

  return (
    <WidgetButton
      elementType="div"
      Icon={ZoomInIcon}
      titleTranslationKey={"content.zoom"}
      title="Zoom"
      stats={zoom ? `${(zoom * 100).toFixed(0)}%` : undefined}
    >
      <div className={styled.accZoomButton}>
        <ValueControlButton onClick={increaseZoomHandler} controlType="increase" />
        <ValueControlButton onClick={zoomInitHandler} controlType="init" />
        <ValueControlButton onClick={decreaseZoomHandler} controlType="decrease" />
      </div>
    </WidgetButton>
  )
}

export default ZoomButton
