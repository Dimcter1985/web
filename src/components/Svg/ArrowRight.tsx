import React from 'react'

import { black } from 'core/theme/colors'

const ArrowRight = ({ color, ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 9 14' {...props}>
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-347.000000, -109.000000)' stroke={color}>
        <polyline transform='translate(347.772727, 115.772727) rotate(135.000000) translate(-347.772727, -115.772727) ' points='343 120.545455 343 111 352.545455 111' />
      </g>
    </g>
  </svg>
)

ArrowRight.defaultProps = {
  width: 9,
  height: 14,
  color: black,
}

export default ArrowRight
