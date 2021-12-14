import { Overrides } from '@material-ui/core/styles/overrides'

import { lightGray } from 'core/theme/colors'

const divider: Overrides['MuiDivider'] = {
  root: { 
    backgroundColor: lightGray,
  },
}

export default divider
