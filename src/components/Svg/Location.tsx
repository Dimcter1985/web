import React from 'react'

import { black } from 'core/theme/colors'

const Location = ({ color, ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 60 60' {...props}>
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g fill={color} fillRule='nonzero'>
        <path d='M30,26 C33.86,26 37,22.859 37,19 C37,15.141 33.86,12 30,12 C26.14,12 23,15.141 23,19 C23,22.859 26.14,26 30,26 Z M30,14 C32.757,14 35,16.243 35,19 C35,21.757 32.757,24 30,24 C27.243,24 25,21.757 25,19 C25,16.243 27.243,14 30,14 Z' />
        <path d='M29.823,54.757 L45.164,32.6 C50.918,24.929 50.086,12.32 43.383,5.618 C39.761,1.995 34.945,0 29.823,0 C24.701,0 19.885,1.995 16.263,5.617 C9.56,12.319 8.728,24.928 14.459,32.569 L29.823,54.757 Z M17.677,7.031 C20.922,3.787 25.235,2 29.823,2 C34.411,2 38.724,3.787 41.969,7.031 C48.019,13.08 48.764,24.468 43.542,31.43 L29.823,51.243 L16.082,31.4 C10.882,24.468 11.628,13.08 17.677,7.031 Z' />
        <path d='M42.117,43.007 C41.567,42.94 41.071,43.334 41.007,43.883 C40.943,44.432 41.335,44.929 41.883,44.993 C52.399,46.231 58,49.567 58,51.5 C58,54.214 47.348,58 30,58 C12.652,58 2,54.214 2,51.5 C2,49.567 7.601,46.231 18.117,44.993 C18.665,44.929 19.057,44.431 18.993,43.883 C18.928,43.334 18.432,42.938 17.883,43.007 C7.354,44.247 0,47.739 0,51.5 C0,55.724 10.305,60 30,60 C49.695,60 60,55.724 60,51.5 C60,47.739 52.646,44.247 42.117,43.007 Z' />
      </g>
    </g>
  </svg>
)

Location.defaultProps = {
  width: 18,
  height: 18,
  color: black,
}

export default Location
