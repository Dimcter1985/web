import React from 'react'

import { white } from 'core/theme/colors'

const Marker = ({ color, ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 68 100' {...props}>
    <g>
      <path fill={color} d='M34,0C15.3,0,0.1,15.2,0.1,33.9c0,0.4,0,0.8,0,1.2c0.1,3.6,0.8,7,1.9,10.2C9.3,69,34,100,34,100
        s24.7-31,31.9-54.7c1.1-3.2,1.8-6.6,1.9-10.2c0-0.4,0-0.8,0-1.2C67.9,15.2,52.7,0,34,0z M34,50.5c-9.2,0-16.6-7.4-16.6-16.6
        c0-9.2,7.4-16.6,16.6-16.6c9.2,0,16.6,7.4,16.6,16.6C50.6,43,43.2,50.5,34,50.5z' />
    </g>
    <circle fill='#D94B4C' cx='34' cy='33.8' r='16.9'/>
  </svg>
)

Marker.defaultProps = {
  width: 68,
  height: 100,
  color: white,
}

export default Marker
