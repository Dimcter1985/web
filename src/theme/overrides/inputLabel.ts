import { Overrides } from '@material-ui/core/styles/overrides'

const inputLabel: Overrides['MuiInputLabel'] = {
  shrink: {
    transform: 'none',
    marginBottom: '10px',
  },
  outlined: {
    position: 'static',
    transform: 'none',
    textAlign: 'left',
    marginBottom: '10px',
    textTransform: 'uppercase',

    '&[class*=MuiInputLabel-shrink]': {
      transform: 'none',
    },
    '&.MuiInputLabel-shrink': {
      transform: 'none',
    },
    '&.MuiInputLabel-marginDense': {
      transform: 'none',
    },
  },
  filled: {
    opacity: 0.6,
    '&.Mui-error': {
      opacity: 1,
    },
    '&[class*=MuiInputLabel-shrink]': {
      fontSize: 12,
      maxWidth: 200,
      transform: 'translate(13px, 10px)',
    },
    '&[class*=MuiInputLabel-shrink].Mui-error': {
      opacity: 1,
    },
  },
}

export default inputLabel
