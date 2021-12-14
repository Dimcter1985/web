import { ValidationErrors } from 'final-form'

import validate from 'core/utils/validate'

const constraints = {
  cardId: {
    presence: {
      message: '^Card is required',
    },
  },
  tipIndex: {
    presence: {
      message: '^Tip is required',
    },
  },
}

const validator = (values: any): ValidationErrors => {
  return validate(values, constraints)
}

export default validator
