import React from 'react'
import withInput from 'hocs/withInput'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import FormHelperText from 'components/FormHelperText'
import TextMask from './components/TextMask'

interface IProps {
  className?: string;
  variant?: TextFieldProps['variant'];
  mask: Array<string | RegExp>;
  placeholder?: string;
  guide?: boolean;
  error?: TextFieldProps['error']
  helperText?: TextFieldProps['helperText']
}

const MaskedInput: React.FC<IProps & TextFieldProps> = ({
  className,
  variant = 'outlined',
  mask,
  placeholder,
  guide = true,
  error,
  helperText,
  ...props
}) => (
  <TextField
    classes={{ root: className }}
    variant={variant}
    InputLabelProps={{ shrink: true }}
    InputProps={{
      inputComponent: TextMask as any,
      inputProps: { placeholder, mask, guide },
    }}
    error={error}
    helperText={<FormHelperText variant={variant} error={error}>{ helperText }</FormHelperText>}
    {...props}
  />
)

export { MaskedInput }
export default withInput(MaskedInput)
