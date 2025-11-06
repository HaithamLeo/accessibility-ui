import React from "react"

export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  color?: string
  className?: string
  style?: React.CSSProperties
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IconBase = ({ size = "100%", color = "currentColor", className, style, ...rest }: IconBaseProps): JSX.Element => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: typeof size === "number" ? `${size}px` : size,
      height: typeof size === "number" ? `${size}px` : size,
      ...style,
    }}
    className={className}
  >
    {/* SVG will be rendered by children */}
    {rest.children}
  </span>
)

export default IconBase
