import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import { white, black } from 'core/theme/colors'

const transparent = 'transparent'
const bold = 'bold'
const uppercase = 'uppercase'
const important = '!important'

const themeOptions: ThemeOptions = {
  overrides: {
    MuiPickersCalendar: {
      transitionContainer: {
        marginTop: '16px',
      },
    },
    MuiPickersDay: {
      day: {
        margin: '0px 4px',
        color: white,

        '& [class*="MuiTypography-root"]': {
          fontSize: '1rem',
        },
      },
      daySelected: {
        backgroundColor: white,
        color: black,
      },
      dayDisabled: {
        color: fade(white, 0.5),
      },
      current: {
        color: white,
      },
    },
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        backgroundColor: transparent,
      },
    },
    MuiPickersCalendarHeader: {
      daysHeader: {
        maxHeight: '61px',
        paddingTop: '20px',
        paddingBottom: '20px',
        borderBottom: `1px solid ${white}`,
      },
      dayLabel: {
        margin: '0 4px',
        color: white,
        fontWeight: bold,
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: uppercase,
      },
      iconButton: {
        padding: '6px',

        '&:hover': {
          backgroundColor: `${white} ${important}`,
        },
        '&.Mui-disabled': {
          backgroundColor: `${transparent} ${important}`,
        },
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: '375px',
      },
    },
  },
} as any

const theme = createMuiTheme(themeOptions)

export default theme