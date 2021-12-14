import { ValidationErrors } from 'final-form'
import {
  REQUIRED_FIELD,
  INCORRECT_FULL_NAME,
  INCORRECT_EMAIL,
} from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { IParams } from 'api/createPotentialSalon'
import { FORM_FIELDS } from './consts'

const constraints = {
  [FORM_FIELDS.OWNER_NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
    format: {
      pattern: /((\b[a-zA-Z]+\b)\s*){2,}/,
      message: INCORRECT_FULL_NAME,
    },
  },
  [FORM_FIELDS.NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.EMAIL]: {
    presence: {
      message: REQUIRED_FIELD,
    },
    email: {
      message: INCORRECT_EMAIL,
    },
  },
  [FORM_FIELDS.PHONE]: {
    phone: true,
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function valitdator(values: IParams): ValidationErrors {
  return validate(values, constraints)
}
