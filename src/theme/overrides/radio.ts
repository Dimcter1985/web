import { Overrides } from '@material-ui/core/styles/overrides'
import { black } from 'core/theme/colors'

const radio: Overrides['MuiRadio'] = {
  root: {
    color: black,
    padding: '6px',
  },
  colorSecondary: {
    '&$checked': {
      color: black,
    },
  },
}

export default radio
