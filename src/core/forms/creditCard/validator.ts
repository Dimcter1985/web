import { ValidationErrors } from 'final-form'

import {
  REQUIRED_FIELD,
  INCORRECT_FULL_NAME,
} from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { FORM_FIELDS } from './consts'

const constraints = {
  [FORM_FIELDS.CARD_HOLDER_NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
    format: {
      pattern: /((\b[a-zA-Z]+\b)\s*){2,}/,
      message: INCORRECT_FULL_NAME,
    },
  },
  [FORM_FIELDS.CARD_NUMBER]: {
    creditCard: true,
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.EXPIRATION_DATE]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.CVV]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.POSTAL_CODE]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function validator(values: ICreditCardValues): ValidationErrors {
  return validate(values, constraints)
}