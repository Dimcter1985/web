import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import type {} from '@material-ui/lab/themeAugmentation'

import button from './overrides/button'
import inputLabel from './overrides/inputLabel'
import radio from './overrides/radio'
import link from './overrides/link'
import rating from './overrides/rating'
import paginationItem from './overrides/paginationItem'
import divider from './overrides/divider'
import outlinedInput from './overrides/outlinedInput'
import formControl from './overrides/formControl'
import formHelperText from './overrides/formHelperText'
import formLabel from './overrides/formLabel'
import muiSwitch from './overrides/switch'
import palette from './palette'
import typography from './typography'
import filledInput from './overrides/filledInput'
import autocomplete from './overrides/autcomplete'
import select from './overrides/select'

const themeOptions: ThemeOptions = {
  overrides: {
    MuiButton: button,
    MuiCheckbox: {
      root: {
        color: '#000000',
      },
    },
    MuiDivider: divider,
    MuiFormControl: formControl,
    MuiFormControlLabel: {
      root: {
        marginLeft: '-6px',
      },
    },
    MuiFormHelperText: formHelperText,
    MuiFormLabel: formLabel,
    MuiInputLabel: inputLabel,
    MuiLink: link,
    MuiOutlinedInput: outlinedInput,
    MuiFilledInput: filledInput,
    MuiPaginationItem: paginationItem,
    MuiRadio: radio,
    MuiRating: rating,
    MuiSwitch: muiSwitch,
    MuiAutocomplete: autocomplete,
    MuiSelect: select,
  },
  typography,
  palette,
} as ThemeOptions as any

const theme = createMuiTheme(themeOptions)

export { themeOptions }
export default theme