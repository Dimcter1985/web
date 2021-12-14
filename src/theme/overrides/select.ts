import { Overrides } from '@material-ui/core/styles/overrides'

const select: Overrides['MuiSelect'] = {
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
}

export default select
