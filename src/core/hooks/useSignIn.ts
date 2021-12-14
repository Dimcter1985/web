import { useCallback, useState } from 'react'

import createMobileVerification from 'core/api/auth/createMobileVerification'
import createMobileSession from 'core/api/auth/createMobileSession'
import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import useApp from './useApp'

export interface IUseSignIn {
  sendCode: (values: ISignInFormValues) => Promise<IResult | IFormErrors | undefined>
  signIn: (values: ICodeFormValues) => Promise<void>
  resetValues: () => void
  codeSended: boolean
}

interface IParams {
  onSuccess?: (user: ICustomer) => void
}

const useSignIn = (params: IParams = {}): IUseSignIn => {

  const { onSuccess } = params

  const [authValues, setAuthValues] = useState<ISignInFormValues | null>(null)

  const { logIn } = useApp()

  const sendCode = useCallback(async (values: ISignInFormValues) => {
    try {
      await createMobileVerification(values)
      setAuthValues(values)
    } catch (error) {
      return convertToFormErrors(error)
    }
  }, [createMobileVerification, convertToFormErrors, setAuthValues])

  const resetValues = useCallback(() => {
    setAuthValues(null)
  }, [setAuthValues])

  const signIn = useCallback(async ({ code }: ICodeFormValues) => {
    if (!authValues) return
    const user = await createMobileSession({
      ...authValues,
      code: Number(code),
    })
    await logIn(user)
    setAuthValues(null)
    if (onSuccess) onSuccess(user)
  }, [createMobileSession, authValues, logIn, onSuccess])

  const codeSended = !!authValues

  return {
    sendCode,
    codeSended,
    resetValues,
    signIn,
  }
}

export default useSignIn