import { fade } from '@material-ui/core'
import { Overrides } from '@material-ui/core/styles/overrides'

import { black, white } from 'core/theme/colors'

const button: Overrides['MuiButton'] = {
  root: {
    fontSize: '1rem',
    borderRadius: 0,
    padding: '8px 16px',
    fontWeight: 700,
  },
  contained: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&$disabled': {
      color: fade(white, 0.6),
      backgroundColor: fade(black, 0.6),
    },
  },
  containedSizeLarge: {
    fontSize: '1.5rem',
    width: '320px',
    height: '60px',
  },
  outlinedPrimary: {
    borderColor: '#EFC2B1',
  },
  outlinedSizeLarge: {
    fontSize: '1.5rem',
    width: '320px',
    height: '60px',
  },
}

export default button
