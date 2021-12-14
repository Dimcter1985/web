import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import omit from 'lodash/omit'
import moment from 'moment'
import stylesBlock from 'utils/stylesBlock'

import useApp from 'core/hooks/useApp'
import useAuthDialog from 'hooks/useAuthDialog'
import useMediaQueries from 'hooks/useMediaQueries'
import getFullNumber from 'utils/getFullNumber'

import Gradient from 'components/Gradient'
import TextInput from 'components/Inputs/TextInput'
import SelectInput from 'components/Inputs/SelectInput'
import PhoneInput from 'components/Inputs/PhoneInput'
import CodeCountryInput from 'components/Inputs/CodeCountryInput'
import Button from 'components/Button'
import InfoCard from 'components/InfoCard'
import DatePickerInput from 'components/Inputs/DatePickerInput'
import { INFO_SECTION } from '../../consts'
import validator from './validator'
import {
  FEATURES as features,
  PRICES as prices,
  FORM_FIELDS,
  PLACEHOLDER,
  IGiftCardFormValue,
} from './consts'
import styles from './Info.module.scss'

const b = stylesBlock(styles)

const today = moment()

interface IValues extends IGiftCardFormValue {
  codeCountry: string;
}

const validate = (values: IValues) => (
  validator({ 
    ...omit(values, ['codeCountry', 'phoneNumber']),
    phoneNumber: values.phoneNumber 
      ? getFullNumber(values.codeCountry, values.phoneNumber) 
      : '',
  })
)

const Info: React.FC = () => {
  const { isLogged } = useApp()
  const { show } = useAuthDialog()
  const { isSmallScreen } = useMediaQueries()

  const submit = useCallback((_values: IValues) => {
    if (!isLogged) { show() }
  }, [show, isLogged])

  return (
    <div id={INFO_SECTION} className={b('content')}>
      <div className={b('features')}>
        <Gradient position='left' />
        { features.map((feature, index) => (
          <InfoCard
            key={index.toString()}
            className={b('card')}
            textAlign={isSmallScreen ? 'center' : 'left'}
            title={feature.title} 
            subtitle={feature.subtitle}
          />
        ))}
      </div>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting }): React.ReactNode => (
          <form className={b('form')} onSubmit={handleSubmit}>
            <TextInput
              name={FORM_FIELDS.NAME}
              label='Your name'
              fullWidth
            />
            <TextInput
              name={FORM_FIELDS.EMAIL}
              label='Your email'
              fullWidth
            />
            <CodeCountryInput
              name={FORM_FIELDS.CODE_COUNTRY}
              label='Country'
              fullWidth
            />
            <PhoneInput
              name={FORM_FIELDS.PHONE_NUMBER}
              label='Phone number'
              placeholder={PLACEHOLDER}
              fullWidth
            />
            <SelectInput
              name={FORM_FIELDS.CARD_AMOUNT}
              items={prices}
              label='Gift card amount'
              SelectProps={{ displayEmpty: true }}
              blankText='Select Amount'
              fullWidth
            />
            <TextInput
              name={FORM_FIELDS.RECIPIENT_NAME}
              label="Recipient's name"
              fullWidth
            />
            <TextInput
              name={FORM_FIELDS.RECIPIENT_EMAIL}
              label="Recipient's email"
              fullWidth
            />
            <DatePickerInput
              name={FORM_FIELDS.SEND_DATE}
              label='When do you wand this sent?'
              initialValue={today}
              disablePast
              fullWidth
            />
            <TextInput
              name={FORM_FIELDS.MESSAGE}
              label='Message to recipient'
              multiline
              rows={3}
              fullWidth
            />
            <Button
              className={b('button')}
              size='large'
              type='submit'
              disabled={submitting}
            >
              Add to cart
            </Button>
          </form>
        )}
      />
    </div>
  )
}

export default Info
