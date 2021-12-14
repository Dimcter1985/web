import React from 'react'
import moment from 'moment'
import { Form } from 'react-final-form'

import Button from 'components/Button'
import Text from 'components/Text'
import SubmitError from 'components/SubmitError'
import TextInput from 'components/Inputs/TextInput'
import MaskedInput from 'components/Inputs/MaskedInput'
import DateInput from 'components/Inputs/DateInput'
import YesNoInput from 'components/Inputs/YesNoInput'
import validator from 'core/forms/creditCard/validator'
import {
  MAX_CARD_HOLDER_NAME_LENGTH,
  MAX_ZIP_CODE_LENGTH,
  CARD_NUMBER_MASK,
  CVV_MASK,
} from './consts'

import styles from './AddCardForm.module.scss'

interface IProps {
  onClose: () => void
  onAdd: (values: any) => void
}

const now = moment()

const transformZipCode = (value?: string): string => {
  return value?.match(/[\d-]/g)?.join('') || ''
}

const transformCardHolderName = (value?: string): string => {
  return value?.match(/[a-zA-Z\s-]/g)?.join('') || ''
}

const AddCardForm: React.FC<IProps> = ({ onClose, onAdd }) => (
  <div className={styles.addCardForm}>
    <div className={styles.headerGroup}>
      <Text className={styles.caption}>
        Add New Card
      </Text>
      <Button
        onClick={onClose}
        className={styles.closeBtn}
        variant='text'
      >
        close
      </Button>
    </div>
    <Text className={styles.subcaption}>
      We accept all major credit cards.
    </Text>
    <Form
      onSubmit={onAdd}
      validate={validator}
      render={({ handleSubmit, submitError, submitting }): React.ReactNode => {
        return (
          <form onSubmit={handleSubmit}>
            <TextInput
              name='cardholderName'
              className={styles.fullwidthInput}
              inputProps={{ maxLength: MAX_CARD_HOLDER_NAME_LENGTH }}
              label='Card Holder Name'
              transform={transformCardHolderName}
              fullWidth
            />
            <MaskedInput
              name='number'
              className={styles.fullwidthInput}
              label='Card number'
              mask={CARD_NUMBER_MASK}
              guide={false}
              fullWidth
            />
            <div className={styles.inputGroup}>
              <DateInput
                name='expirationDate'
                className={styles.smallInput}
                autoOk
                disablePast
                format='MM/YY'
                label='Expiration Date'
                variant='inline'
                minDate={now}
                initialValue={now}
                views={['year', 'month']}
                fullWidth
              />
              <MaskedInput
                name='cvv'
                className={styles.smallInput}
                label='Security Code'
                mask={CVV_MASK}
                guide={false}
                fullWidth
              />
            </div>
            <div className={styles.inputGroup}>
              <TextInput
                name='postalCode'
                className={styles.smallInput}
                label='Zip code'
                inputProps={{ maxLength: MAX_ZIP_CODE_LENGTH }}
                fullWidth
                parse={transformZipCode}
              />
            </div>
            <div className={styles.inputGroup}>
              <YesNoInput
                name='default'
                label='Make primary'
                labelClassName={styles.makePrimary}
              />
            </div>
            { submitError && <SubmitError>{submitError}</SubmitError> }
            <div className={styles.addButtonWrapper}>
              <Button 
                type='submit'
                className={styles.addButton}
                disabled={submitting}
              >
                Add card
              </Button>
            </div>
          </form>
        )
      }}
    />
  </div>
)

export default AddCardForm
