import { ThemeOptions } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import { black } from 'core/theme/colors'

const palette: ThemeOptions['palette'] = {
  primary: {
    main: black,
  },
  secondary: {
    main: '#EFC2B1',
  },
  text: {
    primary: black,
    secondary: fade(black, 0.5),
  },
}

export default palette
