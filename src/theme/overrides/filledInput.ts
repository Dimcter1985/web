import { Overrides } from '@material-ui/core/styles/overrides'

const filledInput: Overrides['MuiFilledInput'] = {
  root: {
    backgroundColor: 'transparent',
    '&.Mui-focused, &:hover': {
      backgroundColor: 'transparent',
    },
  },
  input: {
    paddingTop: 25,
    paddingBottom: 12,
    '&::placeholder': {
      opacity: 0.6,
    },
  },
  adornedStart: {
    paddingLeft: 0,
  },
  inputAdornedStart: {
    marginLeft: 20,
  },
  underline: {
    '&.Mui-focused:before': {
      borderColor: '#000',
      borderWidth: 2,
    },
    '&.Mui-error:before': {
      borderColor: '#F44336',
    },
    '&:before': {
      top: 0,
      transition: 'none',
      border: '1px solid #000',
      borderBottomColor: '#000',
    },
    '&:hover:before': {
      borderBottomColor: '#000',
    },
    '&:after': {
      display: 'none',
    },
  },
}

export default filledInput
