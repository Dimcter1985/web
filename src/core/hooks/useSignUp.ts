import { useCallback, useState } from 'react'

import createMobileVerification from 'core/api/auth/createMobileVerification'
import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import createProfile from 'core/api/auth/createProfile'
import splitFullName from 'core/utils/user/splitFullName'
import useApp from './useApp'

export interface IUseSignUp {
  sendCode: (values: ISignUpFormValues) => Promise<IResult | IFormErrors | undefined>
  signUp: (values: ICodeFormValues, deviceType: string) => Promise<void>
  resetValues: () => void
  codeSended: boolean
}

interface IParams {
  onSuccess?: (user: ICustomer) => void
}

type IAuthValues = Omit<ISignUpParams, 'code' | 'deviceType'>

const useSignUp = (params: IParams = {}): IUseSignUp => {

  const { onSuccess } = params

  const [authValues, setAuthValues] = useState<IAuthValues | null>(null)

  const { logIn } = useApp()

  const sendCode = useCallback(async ({ fullName, ...rest }: ISignUpFormValues) => {
    try {
      const values = {
        ...rest,
        ...splitFullName(fullName),
      }
      await createMobileVerification({
        mobile: rest.mobile,
        type: 'signup',
      })
      setAuthValues(values)
    } catch (error) {
      return convertToFormErrors(error)
    }
  }, [createMobileVerification, setAuthValues])

  const resetValues = useCallback(() => {
    setAuthValues(null)
  }, [setAuthValues])

  const signUp = useCallback(async ({ code }: ICodeFormValues, deviceType: string) => {
    if (!authValues) return undefined
    const user = await createProfile({
      code: Number(code),
      deviceType,
      ...authValues,
    })
    await logIn(user)
    setAuthValues(null)
    if (onSuccess) onSuccess(user)
  }, [authValues, createProfile, logIn, setAuthValues, onSuccess])

  const codeSended = !!authValues

  return {
    sendCode,
    signUp,
    resetValues,
    codeSended,
  }
}

export default useSignUp