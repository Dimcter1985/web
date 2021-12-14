import { Overrides } from '@material-ui/core/styles/overrides'

const muiSwitch: Overrides['MuiSwitch'] = {
  root: {
    width: '44px',
    height: '24px',
    padding: '0',
    '&$checked': {
      color: '#fff',
      opacity: '1',
    },
  },
  thumb: {
    width: '22px',
    height: '22px',
  },
  switchBase: {
    padding: 1,
    color: '#fff',
    '&$checked': {
      '& + $track': {
        opacity: '1',
      },
    },
  },
  colorSecondary: {
    '&$checked': {
      color: '#000',
      opacity: '1',
      '& + $track': {
        backgroundColor: '#fff',
      },
    },
    '&$disabled': {
      color: '#444',
      '& + $track': {
        backgroundColor: '#252525',
        opacity: '1',
      },
    },
  },
  track: {
    borderRadius: '12px',
    backgroundColor: '#808080',
    opacity: '1',
  },
}

export default muiSwitch
