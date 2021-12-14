import React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'
import { FilledInputProps } from '@material-ui/core'
import FormHelperText from 'components/FormHelperText'
import withInput from 'hocs/withInput'

interface ITextField {
  className?: string,
  classes?: OutlinedInputProps['classes'] | FilledInputProps['classes'],
}

export type IProps = ITextField & TextFieldProps

const TextInput: React.FC<IProps> = ({
  className,
  variant = 'outlined',
  classes,
  InputLabelProps,
  InputProps,
  helperText,
  error,
  ...props
}) => (
  <TextField
    classes={{ root: className }}
    variant={variant}
    InputLabelProps={{ shrink: true, ...InputLabelProps }}
    InputProps={{ classes, ...InputProps }}
    error={error}
    helperText={
      helperText
        ? <FormHelperText variant={variant} error={error}>{ helperText }</FormHelperText>
        : null
    }
    {...props}
  />
)

export { TextInput }
export default withInput(TextInput)
