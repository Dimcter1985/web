import { ThemeProvider } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import dateMomentUtils from '@date-io/moment'

import theme from './theme'
import styles from './calendar.module.scss'

class CustomUtils extends dateMomentUtils {
  getWeekdays() {
    return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  }
}

interface IProps {
  value: MaterialUiPickersDate
  onChange: (date: MaterialUiPickersDate) => void
}

const Calendar: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <MuiPickersUtilsProvider utils={CustomUtils}>
          <DatePicker
            autoOk
            allowKeyboardControl
            disablePast
            disableToolbar
            variant='static'
            openTo='date'
            value={value}
            onChange={onChange}
          />
        </MuiPickersUtilsProvider>
      </div>
    </ThemeProvider>
  )
}

export default Calendar
