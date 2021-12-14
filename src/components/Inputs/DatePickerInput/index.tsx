import React from 'react'
import { Moment } from 'moment'
import withInput from 'hocs/withInput'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker, DatePickerProps } from '@material-ui/pickers'

interface IProps {
  value: Moment;
  onChange: () => void;
}

type CustomDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'>

const DatePickerInput: React.FC<IProps & CustomDatePickerProps> = ({
  value,
  onChange,
  ...props
}) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <DatePicker
      inputVariant='outlined'
      variant='inline'
      format='MM/DD/yyyy'
      emptyLabel='MM/DD/YYYY'
      autoOk
      value={value}
      onChange={onChange}
      {...props}
    />
  </MuiPickersUtilsProvider>
)

export { DatePickerInput }
export default withInput(DatePickerInput)
