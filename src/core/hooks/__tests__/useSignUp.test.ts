import { renderHook, act } from '@testing-library/react-hooks'
import { FORM_ERROR } from 'final-form'

import createMobileVerification from 'core/api/auth/createMobileVerification'
import { def, baseErrorFactory, customerFactory } from 'spec'
import createProfile from 'core/api/auth/createProfile'
import useSignUp, { IUseSignUp } from '../useSignUp'

jest.mock('core/api/auth/createMobileVerification', () => jest.fn())
jest.mock('core/api/auth/createProfile', () => jest.fn())

jest.mock('core/hooks/useApp', () => () => ({
  logIn: jest.fn(),
}))

afterAll(jest.clearAllMocks)

describe('useSignUp', () => {
  def('subject', () => renderHook(() => useSignUp()))

  def('params', () => ({
    fullName: 'John Smith',
    email: 'john@smith.com',
    mobile: '+19171112233',
    zipCode: '10001',
    aboutUs: 'Facebook',
  }))

  def('formattedParams', () => ({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@smith.com',
    mobile: '+19171112233',
    zipCode: '10001',
    aboutUs: 'Facebook',
  }))

  it('has correct initial state', () => {
    const hook = get.subject.result.current as IUseSignUp

    expect(typeof hook.sendCode).toEqual('function')
    expect(typeof hook.signUp).toEqual('function')
    expect(typeof hook.resetValues).toEqual('function')
    expect(hook.codeSended).toEqual(false)
  })

  describe('Success', () => {
    describe('createMobileVerification', () => {
      def('response', () => ({ success: true }))

      beforeEach(() => {
        (createMobileVerification as any).mockResolvedValue(get.response)
      })

      it('sends form values, receives code and resets form values', async () => {
        const { result } = get.subject

        await act(async() => { await result.current.sendCode(get.params) })

        expect(createMobileVerification).toBeCalledWith({
          mobile: get.formattedParams.mobile,
          type: 'signup',
        })

        expect(result.current.codeSended).toEqual(true)

        act(() => { result.current.resetValues() })

        const hook = get.subject.result.current as IUseSignUp
        expect(hook.codeSended).toEqual(false)
      })
    })

    describe('createProfile', () => {
      def('codeParams', () => ({ code: 1234 }))

      def('response', customerFactory)

      beforeEach(() => {
        (createProfile as any).mockResolvedValue(get.response)
      })

      it('does sign in, receives customer data and reset values', async () => {
        const { result } = get.subject

        await act(async() => { await result.current.sendCode(get.params) })
        await act(async() => { await result.current.signUp(get.codeParams, 'web') })

        expect(createProfile).toBeCalledWith({
          ...get.formattedParams,
          deviceType: 'web',
          code: 1234,
        })

        expect(result.current.codeSended).toEqual(false)
      })
    })
  })

  describe('Failure', () => {
    def('error', () => 'Phone is taken')
    def('response', () => baseErrorFactory(get.error))

    beforeEach(() => {
      (createMobileVerification as any).mockRejectedValue(get.response)
    })

    it('returns api form error', async () => {
      const { sendCode } = get.subject.result.current as IUseSignUp
      expect(await sendCode(get.params)).toEqual({ [FORM_ERROR]: get.error })
    })
  })
})
