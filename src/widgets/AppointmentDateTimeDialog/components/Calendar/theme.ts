import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import { white, black } from 'core/theme/colors'

const transparent = 'transparent'
const bold = 'bold'
const uppercase = 'uppercase'

const themeOptions: ThemeOptions = {
  overrides: {
    MuiPickersCalendar: {
      transitionContainer: {
        marginTop: '16px',
        minHeight: '288px',
      },
    },
    MuiPickersDay: {
      day: {
        width: '32px',
        height: '32px',
        margin: '8px 18px',
        color: white,

        '& [class*="MuiTypography-root"]': {
          fontSize: '1rem',
          fontWeight: bold,
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
      switchHeader: {
        display: 'none',
      },
      daysHeader: {
        maxHeight: '41px',
        paddingBottom: '20px',
        borderBottom: `1px solid ${white}`,
      },
      dayLabel: {
        margin: '0 16px',
        color: white,
        fontWeight: bold,
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: uppercase,
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: '500px',
      },
      pickerViewLandscape: {
        padding: '0px',
      },
    },
  },
} as any

const theme = createMuiTheme(themeOptions)

export default theme