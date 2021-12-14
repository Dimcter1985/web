import React, { useEffect } from 'react'
import { useField, useForm } from 'react-final-form'
import ReactCodeInput from 'react-code-input'
import stylesBlock from 'utils/stylesBlock'
import styles from './VerifyCodeInput.module.scss'

interface IProps {
  name: string;
  autoSubmit?: boolean;
  hasError?: boolean;
}

const b = stylesBlock(styles)

const CODE_LENGTH = 4

const VerifyCodeInput: React.FC<IProps> = ({ name, autoSubmit, hasError = false }) => {
  const { input } = useField<string>(name)
  const form = useForm()

  useEffect(() => {
    if (autoSubmit && input.value && input.value.length === CODE_LENGTH) {
      form.submit()
    }
  }, [input.value, autoSubmit])

  return (
    <ReactCodeInput
      className={b('react-code-input', { invalide: hasError })}
      type='tel'
      fields={4}
      {...input}
    />
  )
}

export default VerifyCodeInput
