import { ValidationErrors } from 'final-form'

import { INCORRECT_FULL_NAME, REQUIRED_FIELD, INCORRECT_EMAIL } from 'core/consts/validationErrors'
import validate from 'core/utils/validate'

const constraints = {
  fullName: {
    presence: {
      message: REQUIRED_FIELD,
    },
    format: {
      pattern: /((\b[a-zA-Z]+\b)\s*){2,}/,
      message: INCORRECT_FULL_NAME,
    },
  },
  email: {
    presence: {
      message: REQUIRED_FIELD,
    },
    email: {
      message: INCORRECT_EMAIL,
    },
  },
}

export default function validator(values: IEditProfileValues): ValidationErrors {
  return validate(values, constraints)
}