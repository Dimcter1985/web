import React from 'react'
import { Form } from 'react-final-form'
import stylesBlock from 'utils/stylesBlock'

import { TERMS_URL, POLICY_URL, ACCESSIBILITY_STATEMENT_URL } from 'core/consts'
import { FORM_FIELDS, ABOUT_US_SELECT_ITEMS as items } from 'core/forms/signUp/consts'
import validator from 'core/forms/signUp/validator'

import TextInput from 'components/Inputs/TextInput'
import SelectInput from 'components/Inputs/SelectInput'
import Text from 'components/Text'
import ExternalLink from 'components/ExternalLink'
import DialogHeader from '../DialogHeader'
import BackButton from '../BackButton'
import DialogDivider from '../DialogDivider'
import DialogContent from '../DialogContent'
import SubmitButton from '../SubmitButton'

import styles from './RegistrationForm.module.scss'

interface IProps {
  onSubmit: (values: ISignUpFormValues, deviceType: string) => void
  onBack: () => void
}

const b = stylesBlock(styles)

const RegistrationForm: React.FC<IProps> = ({ onSubmit, onBack }) => (
  <>
    <DialogHeader leftIcon={<BackButton onClick={onBack} />}>
      Finish signing up
    </DialogHeader>
    <DialogDivider />
    <DialogContent>
      <div className={b('wrapper')}>
        <Form
          onSubmit={(values: ISignUpFormValues) => onSubmit(values, navigator.appVersion)}
          validate={validator}
          render={({ handleSubmit }): React.ReactNode => (
            <form onSubmit={handleSubmit}>
              <TextInput
                className={b('text-field')}
                name={FORM_FIELDS.FULL_NAME}
                label='Full name'
                placeholder='Full name'
                errorText='Full name is required.'
                helperText='Please enter your full name above for your account information.'
                variant='filled'
                InputLabelProps={{ shrink: undefined }}
                fullWidth
              />
              <TextInput
                className={b('text-field')}
                name={FORM_FIELDS.EMAIL}
                label='Email'
                placeholder='Email'
                errorText='Enter a valid Email.'
                helperText='We will use your email for booking confirmation details, modifications, promos, and receipts.'
                FormHelperTextProps={{ className: b('helper-text') }}
                variant='filled'
                InputLabelProps={{ shrink: undefined }}
                fullWidth
              />
              <SelectInput
                name={FORM_FIELDS.ABOUT_US}
                label='How did you hear about us?'
                items={items}
                blankText='Please select one'
                variant='filled'
                fullWidth
              />
              <Text className={b('policy')}>
                { 'By selecting Agree and Continue below, I agree to the Snailz ' }
                <ExternalLink className={b('link')} href={TERMS_URL}>Terms of Use</ExternalLink>
                { ', ' }
                <ExternalLink
                  className={b('link')}
                  href={ACCESSIBILITY_STATEMENT_URL}
                >
                  Accessibility Statement
                </ExternalLink>
                { ', and ' }
                <ExternalLink className={b('link')} href={POLICY_URL}>Privacy Policy</ExternalLink>
                .
              </Text>
              <SubmitButton>Agree and continue</SubmitButton>
            </form>
          )}
        />  
      </div>
    </DialogContent>
  </>
)

export default RegistrationForm
