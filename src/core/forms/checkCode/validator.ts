import { ValidationErrors } from 'final-form'

import validate from 'core/utils/validate'
import { FORM_FIELDS, CODE_LENGTH } from './consts'

const constraints =  {
  [FORM_FIELDS.CODE]: {
    length: {
      is: CODE_LENGTH,
    },
  },
}

export default function validator(values: ICodeFormValues): ValidationErrors {
  return validate(values, constraints)
}