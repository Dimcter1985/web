import { FORM_ERROR } from 'final-form'

interface IErrors {
  message?: string
  errors?: IPayloadError[]
}

interface IResult {
  [key: string]: string
}

const APOLLO_ERROR_PREFIX = 'GraphQL error: '

const removeApolloErrorPrefix = (errorMessage: string): string => (
  errorMessage.replace(APOLLO_ERROR_PREFIX, '')
)

export default function convertToFormErrors({ message, errors }: IErrors): IResult {
  if (!errors) {
    return { [FORM_ERROR]: removeApolloErrorPrefix(message || '') }
  }

  const messages: Record<string, string> = {}

  errors.forEach(({ attribute, message: shorMessage, fullMessage }) => {
    const fieldName = (!attribute || attribute === 'base') ? FORM_ERROR : attribute
    if (!messages[fieldName]) { messages[fieldName] = fullMessage || shorMessage }
  })

  return messages
}
