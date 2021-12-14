import { Overrides } from '@material-ui/core/styles/overrides'

const autocomplete: Overrides['MuiAutocomplete'] = {
  inputRoot: {
    paddingTop: 0,
    paddingBottom: 0,

    '&[class*="MuiFilledInput-root"]': {
      paddingTop: 17,
      paddingBottom: 2,
    },

    '&[class*="MuiOutlinedInput-root"]': {
      paddingTop: 1.5,
      paddingBottom: 1.5,
    },
  },
}

export default autocomplete
