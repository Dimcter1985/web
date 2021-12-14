import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import merge from 'lodash/merge'

import { black, white } from 'core/theme/colors'

import { themeOptions } from './theme'
import rating from './theme/overrides/rating'

const theme = createMuiTheme(
  merge(
    {},
    themeOptions,
    {
      overrides: {
        MuiAutocomplete: {
          groupLabel: {
            color: fade(white, 0.9),
          },
          noOptions: {
            color: white,
          },
        },
        MuiButton: {
          contained: {
            '&.Mui-disabled': {
              backgroundColor: fade(white, 0.8),
            },
          },
        },    
        MuiOutlinedInput: {
          root: {
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFF',
              },
            },
          },
          input: {
            color: '#FFF',
            '&:-webkit-autofill, &:-webkit-autofill:hover, &-webkit-autofill:focus': {
              '-webkit-text-fill-color': '#FFF',
              'caret-color': '#FFF',
            },
            '&::placeholder': {
              color: '#fff',
              opacity: 1,
            },
          },
          notchedOutline: {
            borderColor: '#FFF',
          },
        },
        MuiFilledInput: {
          input: {
            color: '#FFF',
            '&:-webkit-autofill, &:-webkit-autofill:hover, &-webkit-autofill:focus': {
              '-webkit-text-fill-color': '#FFF',
              'caret-color': '#FFF',
            },
          },
          underline: {
            '&.Mui-focused:before': {
              borderColor: '#FFF',
              borderWidth: 2,
            },
            '&:before': {
              top: 0,
              transition: 'none',
              borderColor: 'rgba(255, 255, 255, 0.6)',
              borderBottomColor: 'rgba(255, 255, 255, 0.6)',
            },
            '&:hover:before': {
              borderBottomColor: 'rgba(255, 255, 255, 0.6)',
            },
          },
        },
        MuiFormLabel: {
          root: {
            color: '#FFF',
          },
        },
        MuiIconButton: {
          root: {
            '&:hover': {
              backgroundColor: fade(white, 0.15),
            },
          },
        },
        MuiDrawer: {
          paper: {
            backgroundColor: '#121212',
          },
        },
        MuiRating: {
          ...rating,
          root: {
            color: white,
          },
          iconEmpty: {
            color: fade(white, 0.38),
          },
        },
        MuiPaper: {
          root: {
            backgroundColor: '#121212',
          },
        },
      },
      palette: {
        primary: {
          main: fade(white, 0.87),
        },
        secondary: {
          main: '#EFC2B1',
        },
        text: {
          primary: white,
          secondary: fade(white, 0.87),
        },
        background: {
          paper: black,
        },
      },
    } as ThemeOptions as any,
  ),
)

export default theme
