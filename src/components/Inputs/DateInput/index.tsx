import React from 'react'
import { DatePicker, DatePickerProps } from '@material-ui/pickers'

import withInput from 'hocs/withInput'

type IProps = DatePickerProps

const DateInput: React.FC<IProps> = ({ inputVariant = 'outlined', ...props }) => {
  return (
    <DatePicker
      inputVariant={inputVariant}
      {...props}
    />
  )
}

export { DateInput }
export default withInput(DateInput)
