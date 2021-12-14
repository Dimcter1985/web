import validatejs from 'validate.js'
import phoneValidator from 'phone'
import { ValidationErrors } from 'final-form'
import cardValidator from 'card-validator'

validatejs.validators.phone = (value: string): string | null => {
  if (!value || phoneValidator(value).length) {
    return null
  }
  return '^Phone number is not correct'
}

validatejs.validators.creditCard = (value: string): string | null => {
  if (!value || cardValidator.number(value.replace(/-/g, '')).isValid) {
    return null
  }
  return '^Card number is not valid'
}

export default function validate<T>(values: T, constraints: unknown): ValidationErrors {
  return validatejs(values, constraints)
}