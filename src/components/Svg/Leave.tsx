import React from 'react'

import { black } from 'core/theme/colors'

const Leave = ({ color, ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 157.5 187.5' {...props}>
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(0.000000, -323.000000)' fill={color}>
        <g transform='translate(0.000000, 323.000000)'>
          <path d='M157.5,187.5 L150,187.5 C150,108 0,97.5 0,0 L7.5,0 C7.5,67.5 157.5,48 157.5,187.5' transform='translate(78.750000, 93.750000) scale(-1, 1) translate(-78.750000, -93.750000)' />
        </g>
      </g>
    </g>
  </svg>
)

Leave.defaultProps = {
  width: 157.5,
  height: 187.5,
  color: black,
}

export default Leave
