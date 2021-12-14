import { ThemeOptions } from '@material-ui/core/styles'

const typography: ThemeOptions['typography'] = {
  fontSize: 14,
  htmlFontSize: 16,
  fontFamily: [
    'Source Sans Pro',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ].join(','),
  subtitle1: {
    fontSize: '1.25rem',
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.875rem',
  },
}

export default typography
