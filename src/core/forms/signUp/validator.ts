import { ValidationErrors } from 'final-form'

import {
  REQUIRED_FIELD,
  INCORRECT_FULL_NAME,
  INCORRECT_EMAIL,
} from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { FORM_FIELDS } from './consts'


const constraints = {
  [FORM_FIELDS.FULL_NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
    format: {
      pattern: /((\b[a-zA-Z]+\b)\s*){2,}/,
      message: INCORRECT_FULL_NAME,
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
  [FORM_FIELDS.ABOUT_US]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function validator(values: ISignUpFormValues): ValidationErrors {
  return validate(values, constraints)
}