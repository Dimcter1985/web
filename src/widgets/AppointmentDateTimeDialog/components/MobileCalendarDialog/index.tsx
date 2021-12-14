import { forwardRef } from 'react'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { ThemeProvider } from '@material-ui/core/styles'
import dateMomentUtils from '@date-io/moment'

import Dialog from 'components/Dialog/Dialog'
import BlackTheme from 'components/BlackTheme'
import Text from 'components/Text'

import HeaderGroup from '../HeaderGroup'
import CloseButton from '../CloseButton'
import theme from './theme'
import styles from './mobileCalendarDialog.module.scss'

class CustomUtils extends dateMomentUtils {
  getWeekdays() {
    return ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  }
}

interface IProps {
  visible: boolean
  onClose: () => void
  date: MaterialUiPickersDate
  onDateChange: (date: MaterialUiPickersDate) => void
}

/* eslint-disable */
const Transition = forwardRef((
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction='up' ref={ref} {...props} />
})
/* eslint-enable */

const MobileCalendarDialog: React.FC<IProps> = ({
  visible,
  onClose,
  date,
  onDateChange,
}) => {
  return (
    <Dialog
      open={visible}
      fullScreen
      TransitionComponent={Transition}
      className={styles.dialog}
    >
      <BlackTheme className={styles.themeWrapper}>
        <HeaderGroup>
          <CloseButton onClick={onClose} />
          <Text className={styles.caption}>
            Calendar
          </Text>
        </HeaderGroup>
        <div className={styles.calendarWrapper}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={CustomUtils}>
              <DatePicker
                autoOk
                allowKeyboardControl
                disablePast
                disableToolbar
                variant='static'
                openTo='date'
                value={date}
                onChange={onDateChange}
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </div>
      </BlackTheme>
    </Dialog>
  )
}

export default MobileCalendarDialog
