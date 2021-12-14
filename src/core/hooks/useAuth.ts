import { useState, useCallback } from 'react'
import pick from 'lodash/pick'
import createMobileVerification from 'core/api/auth/createMobileVerification'
import createMobileSession from 'core/api/auth/createMobileSession'
import checkMobileVerification from 'core/api/auth/checkMobileVerification'
import createProfile from 'core/api/auth/createProfile'
import splitFullName from 'core/utils/user/splitFullName'
import useApp from './useApp'

type IType = 'signin' | 'signup'
type IStep = 'phone' | 'code' | 'signup' | 'finish'

interface IProps {
  onClose: () => void
}

interface IUseAuth {
  step: IStep
  phoneNumber?: string
  errorMessage: string | null
  sendCode: (mobile: string) => void
  onCodeChange: (code: string) => void
  resendCode: () => void
  backToStartStep: () => void
  signUp: (values: ISignUpFormValues, deviceType: string) => void
}

const useAuth = ({ onClose }: IProps): IUseAuth => {
  const { logIn } = useApp()
  const [step, setStep] = useState<IStep>('phone')
  const [type, setType] = useState<IType>('signin')
  const [phone, setPhone] = useState<string>()
  const [code, setCode] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signIn = useCallback(async (newCode: string) => {
    createMobileSession({ mobile: phone!, code: Number(newCode) })
      .then((user) => {
        logIn(user)
        onClose()
      })
      .catch(({ message }) => setErrorMessage(message))
  }, [createMobileSession, logIn, onClose, phone, step, setErrorMessage])

  const signUp = useCallback(async (values: ISignUpFormValues, deviceType: string) => {
    createProfile({
      mobile: phone!,
      code: Number(code),
      ...splitFullName(values.fullName),
      ...pick(values, ['email', 'aboutUs']),
      deviceType,
    })
      .then((user) => {
        logIn(user)
        setStep('finish')
      })
      .catch(({ message }) => setErrorMessage(message))
  }, [phone, code, setStep])

  const sendCode = useCallback(async (mobile: string) => {
    let userExists = false

    await createMobileVerification({ mobile, type: 'signin' })
      .then(() => { userExists = true })
      .catch(({ message }) => setErrorMessage(message))

    if (userExists) {
      setType('signin')
      setStep('code')
      setPhone(mobile)
      setErrorMessage(null)
      return Promise.resolve()
    }

    return createMobileVerification({ mobile, type: 'signup' })
      .then(() => {
        setType('signup')
        setStep('code')
        setPhone(mobile)
        setErrorMessage(null)
      })
      .catch(({ message }) => setErrorMessage(message))
  }, [createMobileVerification, setStep, setPhone, setType, setErrorMessage])

  const onCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
    if (type === 'signin') {
      signIn(newCode)
    } else {
      checkMobileVerification({ mobile: phone!, code: Number(newCode) })
      .then(() => {
        setErrorMessage(null)
        setStep('signup')
      })
      .catch(({ message }) => setErrorMessage(message))
    }
  }, [setCode, setStep, setErrorMessage, phone, step])
  
  const resendCode = useCallback(() => {
    createMobileVerification({ mobile: phone!, type })
  }, [phone, type])

  const backToStartStep = useCallback(() => {
    setErrorMessage(null)
    setStep('phone')
  }, [setErrorMessage, setStep])

  return ({
    step,
    phoneNumber: phone,
    errorMessage,
    sendCode,
    onCodeChange,
    resendCode,
    backToStartStep,
    signUp,
  })
}

export default useAuth
