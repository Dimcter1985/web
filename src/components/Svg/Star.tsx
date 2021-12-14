import React from 'react'
import { black } from 'core/theme/colors'

const Star = ({ opacity, color, ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 30 30' {...props}>
    <path fillRule='evenodd' clipRule='evenodd' d='M15 22.5L6.18322 27.1353L7.86708 17.3176L0.734152 10.3647L10.5916 8.93237L15 0L19.4084 8.93237L29.2658 10.3647L22.1329 17.3176L23.8168 27.1353L15 22.5Z' fill={color} fillOpacity={opacity} />
  </svg>
)

Star.defaultProps = {
  width: 30,
  height: 30,
  color: black,
  opacity: 0.38,
}

export default Star
