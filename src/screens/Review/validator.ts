import { ValidationErrors } from 'final-form'
import validate from 'core/utils/validate'
import { FORM_FIELDS } from 'core/forms/review/consts'
import { REQUIRED_FIELD , IReviewFormValues } from './consts'


const constraints = {
  [FORM_FIELDS.OVERALL_RATING]: {
    numericality: {
      greaterThan: 0,
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.PROMPTNESS_RATING]: {
    numericality: {
      greaterThan: 0,
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.PROFESSIONALISM_RATING]: {
    numericality: {
      greaterThan: 0,
      message: REQUIRED_FIELD,
    },
  },
  [FORM_FIELDS.CLEANLINESS_RATING]: {
    numericality: {
      greaterThan: 0,
      message: REQUIRED_FIELD,
    },
  },
}

export default function valitdator(values: IReviewFormValues): ValidationErrors {
  return validate(values, constraints)
}
