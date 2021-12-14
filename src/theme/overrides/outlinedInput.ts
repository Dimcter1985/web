import { Overrides } from '@material-ui/core/styles/overrides'

const outlinedInput: Overrides['MuiOutlinedInput'] = {
  root: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000000',
        borderWidth: 2,
      },
    },
  },
  input: {
    padding: '11px 14px',
  },
  adornedStart: {
    paddingLeft: '0px',
  },
  inputAdornedStart: {
    marginLeft: '20px',
  },
  notchedOutline: {
    borderColor: '#000000',
    borderWidth: 1,
    top: 0,
    '& > *': {
      display: 'none',
    },
  },
}

export default outlinedInput
