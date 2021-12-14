import React from 'react'
import { useField, UseFieldConfig } from 'react-final-form'

// interface IWithInputProps {
//   name: string,
//   onChange: (event: SyntheticEvent<any> | any) => void,
//   onFocus: (event: SyntheticEvent<any> | any) => void,
//   onBlur: (event: SyntheticEvent<any> | any) => void,
//   value: any,
//   error?: boolean,
//   helperText?: string,
// }

interface IInjectedProps {
  name: string
  value?: any
  type?: string
  initialValue?: any
  parse?: (value: any) => any
  transform?: (value: any) => any
  helperText?: string
  errorText?: string
  error?: boolean
}

type ValueType<T> = T extends { value: infer U } ? U : any

const withInput = (
  InputComponent: React.ComponentType<any>,
  config: UseFieldConfig<ValueType<React.ComponentProps<typeof InputComponent>>> = {},
): React.FC<React.ComponentProps<typeof InputComponent> & IInjectedProps> => {

  const WithInput = ({
    name,
    parse,
    transform,
    type = config.type || 'text',
    initialValue,
    helperText,
    errorText,
    error,
    ...props
  }: React.ComponentProps<typeof InputComponent> & IInjectedProps): React.ReactElement => {

    const { input, meta } = useField<ValueType<React.ComponentProps<typeof InputComponent>>>(
      name,
      { ...config, type, initialValue, parse, format: transform },
    )

    const errorMessage = errorText || meta.error || meta.submitError
    const helperMessage = helperText || ' '

    return (
      <InputComponent
        {...input}
        error={error || meta.touched && meta.invalid}
        helperText={
          meta.touched && (meta.error || meta.submitError)
            ? errorMessage
            : helperMessage
        }
        {...props}
      />
    )
  }

  return WithInput
}

export default withInput
