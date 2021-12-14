import { ValidationErrors } from 'final-form'

import { REQUIRED_FIELD } from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { FORM_FIELDS } from './consts'

const constraints = {
  [FORM_FIELDS.CREDIT_CARD_ID]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function validator(values: ICheckoutValues): ValidationErrors {
  return validate(values, constraints)
}