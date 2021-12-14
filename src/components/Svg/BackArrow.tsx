import React from 'react'
import { black } from 'core/theme/colors'

const BackArrow = ({ color, opacity, ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 8 16' fill='none' {...props}>
    <path d='M7.13787 16L8 15.0337L1.72456 8L8 0.96626L7.13787 0L0 8L7.13787 16Z' fill={color} opacity={opacity} />
  </svg>
)

BackArrow.defaultProps = {
  width: 8,
  height: 16,
  color: black,
  opacity: 1,
}

export default BackArrow
