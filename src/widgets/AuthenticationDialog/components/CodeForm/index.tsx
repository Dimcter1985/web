import React from 'react'
import { Form } from 'react-final-form'
import stylesBlock from 'utils/stylesBlock'

import Text from 'components/Text'
import PureButton from 'components/PureButton'
import FormHelperText from 'components/FormHelperText'
import DialogHeader from '../DialogHeader'
import BackButton from '../BackButton'
import DialogDivider from '../DialogDivider'
import DialogContent from '../DialogContent'
import VerifyCodeInput from '../VerifyCodeInput'

import styles from './CodeForm.module.scss'

interface IProps {
  phoneNumber?: string
  errorMessage: string | null
  onCodeChange: (code: string) => void
  resendCode: () => void
  onBack: () => void
}

interface ICodeFormValues {
  code: string
}

const b = stylesBlock(styles)

const CodeForm: React.FC<IProps> = ({
  phoneNumber,
  errorMessage,
  onCodeChange,
  resendCode,
  onBack,
}) => {
  const hasError = !!errorMessage

  return (
    <>
      <DialogHeader leftIcon={<BackButton onClick={onBack} />}>
        Confirm your number
      </DialogHeader>
      <DialogDivider />
      <DialogContent>
        <Form
          onSubmit={(values: ICodeFormValues) => onCodeChange(values.code)}
          render={({ handleSubmit }): React.ReactNode => (
            <form className={b('wrapper')} onSubmit={handleSubmit}>
              <Text className={b('label')} color='primary'>
                { `Eneter the code we sent over SMS to ${phoneNumber}:` }
              </Text>
              <VerifyCodeInput
                name='code'
                autoSubmit
                hasError={hasError}
              />
              { errorMessage && 
                <FormHelperText variant='filled' error>
                  Login failed because confirmation code was incorrect or expired.
                </FormHelperText>
              }
              <div className={b('resend', { hasError })}>
                <Text className={b('resend-text')}>Didn't get a code?</Text>
                <PureButton className={b('resend-button')} onClick={resendCode}>
                  Resend
                </PureButton>
              </div>
            </form>
          )}
        />
      </DialogContent>
    </>
  )
}

export default CodeForm
