import { ValidationErrors } from 'final-form'
import { REQUIRED_FIELD } from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { IAccountEditFormValue , FORM_FIELDS } from './consts'

const constraints = {
  [FORM_FIELDS.FIRST_NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.LAST_NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function valitdator(values: IAccountEditFormValue): ValidationErrors {
  return validate(values, constraints)
}
