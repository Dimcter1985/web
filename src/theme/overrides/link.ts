import { Overrides } from '@material-ui/core/styles/overrides'

const link: Overrides['MuiLink'] = {
  root: {
    cursor: 'pointer',
  },
  button: {
    '&.Mui-focusVisible': {
      outline: 'none',
    },
  },
}

export default link
