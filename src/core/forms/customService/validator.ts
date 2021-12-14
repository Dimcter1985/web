import { ValidationErrors } from 'final-form'

import { REQUIRED_FIELD } from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { FORM_FIELDS } from './consts'

const constraints =  {
  [FORM_FIELDS.SERVICE_NAME]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.SERIVCE_COST]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function validator(values: ICustomServiceValues): ValidationErrors {
  return validate(values, constraints)
}