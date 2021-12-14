import { renderHook, act } from '@testing-library/react-hooks'
import { FORM_ERROR } from 'final-form'

import createMobileVerification from 'core/api/auth/createMobileVerification'
import createMobileSession from 'core/api/auth/createMobileSession'
import { def, baseErrorFactory, customerFactory } from 'spec'
import useSignIn, { IUseSignIn } from '../useSignIn'

jest.mock('core/api/auth/createMobileVerification', () => jest.fn())
jest.mock('core/api/auth/createMobileSession', () => jest.fn())

jest.mock('core/hooks/useApp', () => () => ({
  logIn: jest.fn(),
}))

afterAll(jest.clearAllMocks)

describe('useSignIn', () => {
  def('subject', () => renderHook(() => useSignIn()))

  def('params', () => ({
    mobile: '+19171112233',
  }))

  it('has correct initial state', () => {
    const hook = get.subject.result.current as IUseSignIn

    expect(typeof hook.sendCode).toEqual('function')
    expect(typeof hook.signIn).toEqual('function')
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

        expect(createMobileVerification).toBeCalledWith({ mobile: '+19171112233' })
        expect(result.current.codeSended).toEqual(true)

        act(() => { result.current.resetValues() })

        const hook = get.subject.result.current as IUseSignIn
        expect(hook.codeSended).toEqual(false)
      })
    })

    describe('createMobileSession', () => {
      def('params', () => ({
        ...get.params,
        code: 1234,
      }))

      def('response', customerFactory)

      beforeEach(() => {
        (createMobileSession as any).mockResolvedValue(get.response)
      })

      it('does sign in, receives customer data and reset values', async () => {
        const { result } = get.subject

        await act(async() => { await result.current.sendCode(get.params) })
        await act(async() => { await result.current.signIn(get.params) })

        expect(createMobileSession).toBeCalledWith(get.params)

        expect(result.current.codeSended).toEqual(false)
      })
    })
  })

  describe('Failure', () => {
    def('error', () => 'Timeout')
    def('response', () => baseErrorFactory(get.error))

    beforeEach(() => {
      (createMobileVerification as any).mockRejectedValue(get.response)
    })

    it('returns api form error', async () => {
      const { sendCode } = get.subject.result.current as IUseSignIn
      expect(await sendCode(get.params)).toEqual({ [FORM_ERROR]: get.error })
    })
  })
})
