import React, { useCallback } from 'react'
import { Form, useFormState } from 'react-final-form'
import stylesBlock from 'utils/stylesBlock'

import validator from 'core/forms/signIn/validator'
import getFullNumber from 'utils/getFullNumber'

import Text from 'components/Text'
import CodeCountryInput from 'components/Inputs/CodeCountryInput'
import PhoneInput from 'components/Inputs/PhoneInput'
import DialogHeader from '../DialogHeader'
import CloseButton from '../CloseButton'
import SubmitButton from '../SubmitButton'
import DialogContent from '../DialogContent'
import DialogDivider from '../DialogDivider'

import styles from './PhoneNumberForm.module.scss'

interface IProps {
  errorMessage: string | null
  submitting?: boolean
  onClose: () => void
}

interface IFormValues {
  codeCountry: string
  mobile: string
}

const b = stylesBlock(styles)

const PhoneNumberForm: React.FC<IProps> = ({ errorMessage, submitting, onClose }) => {
  const { values } = useFormState<IFormValues>()

  const placeholder = values.codeCountry === '1'
    ? `+${values.codeCountry} (XXX) XXX-XXXX`
    : `+${values.codeCountry}`

  return (
    <>
      <DialogHeader leftIcon={<CloseButton onClick={onClose} />}>
        Log in or sign up
      </DialogHeader>
      <DialogDivider />
      <DialogContent>
        <div className={b('wrapper')}>
          <Text className={b('title')}>Welcome to Snailz</Text>
          <div className={b('fields')}>
            <CodeCountryInput
              name='codeCountry'
              label='Country/Region'  
              variant='filled'
            />
            <PhoneInput
              name='mobile'
              label='Phone Number'
              className={b('phone-wrapper')}
              placeholder={placeholder}
              variant='filled'
              InputLabelProps={{ shrink: undefined }}
              errorText='Phone number is too short or contains invalid characters.'
              error={errorMessage ? true : undefined}
              helperText={
                errorMessage 
                || 'We’ll text you to confirm your number. Standard message and data rates apply'
              }
            />
          </div>
          <SubmitButton disabled={submitting}>Continue</SubmitButton>
        </div>
      </DialogContent>
    </>
  )
}

interface IWrapperProps {
  errorMessage: string | null
  onClose: () => void
  sendCode: (mobile: string) => void
}

const validate = (values: IFormValues) => (
  validator({ mobile: values.mobile ? getFullNumber(values.codeCountry, values.mobile) : '' })
)

const PhoneNumberFormWrapper: React.FC<IWrapperProps> = ({ sendCode, ...props }) => {
  const submit = useCallback((values: IFormValues) => {
    sendCode(getFullNumber(values.codeCountry, values.mobile))
  }, [sendCode])

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit, submitting }): React.ReactNode => (
        <form onSubmit={handleSubmit}>
          <PhoneNumberForm submitting={submitting} {...props} />
        </form>
      )}
    />
  )
}

export default PhoneNumberFormWrapper
