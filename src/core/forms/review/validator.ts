import { ValidationErrors } from 'final-form'

import { REQUIRED_FIELD } from 'core/consts/validationErrors'
import validate from 'core/utils/validate'
import { FORM_FIELDS } from './consts'

const constraints =  {
  [FORM_FIELDS.OVERALL_RATING]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.PROMPTNESS_RATING]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.PROFESSIONALISM_RATING]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.CLEANLINESS_RATING]: {
    presence: {
      message: REQUIRED_FIELD,
    },
  },
}

export default function validator(values: ICreateReviewParams): ValidationErrors {
  return validate(values, constraints)
}