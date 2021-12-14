import { fade } from '@material-ui/core/styles/colorManipulator'
import { Overrides } from '@material-ui/core/styles/overrides'

import { black, surfacePrimary, white } from 'core/theme/colors'

const paginationItem: Overrides['MuiPaginationItem'] = {
  root: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1,
  },
  page: {
    '&$selected': {
      color: white,
      backgroundColor: `${surfacePrimary} !important`,
      '&:hover': {
        backgroundColor: surfacePrimary,
      },
    },
    '&:hover': {
      backgroundColor: fade(black, 0.15),
    },
  },
  icon: {
    fontSize: '1.75rem',
  },
}

export default paginationItem
