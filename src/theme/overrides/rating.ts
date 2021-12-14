import { Overrides } from '@material-ui/core/styles/overrides'

import { black } from 'core/theme/colors'

const rating: Overrides['MuiRating'] = {
  root: {
    color: black,
    fontSize: '1.25rem',
  },
  sizeSmall: {
    fontSize: '0.75rem',
  },
  sizeLarge: {
    fontSize: '1.5rem',
  },
}

export default rating
