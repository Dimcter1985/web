import React from 'react'
import { FORM_ERROR } from 'final-form'
import { act, renderHook } from '@testing-library/react-hooks'

import { baseErrorFactory, customerFactory, def, get } from 'core/spec'
import updateProfile from 'core/api/auth/updateProfile'
import App from 'core/contexts/App'
import useUpdateProfile from '../useUpdateProfile'

jest.mock('core/api/auth/updateProfile', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useUpdateProfile', () => {
  def('updateUser', jest.fn)

  def('appContext', () => ({
    updateUser: get.updateUser,
  }))

  const wrapper: React.FC = ({ children }) => (
    <App.Provider value={get.appContext}>
      {children}
    </App.Provider>
  )

  def('subject', () => renderHook(useUpdateProfile, { wrapper } ))

  def('params', () => ({
    fullName: 'John Smith',
    birthday: '2010-10-10',
  }))

  it('has correct initial state', () => {
    const { updateProfile } = get.subject.result.current
    expect(typeof updateProfile).toEqual('function')
  })

  describe('Success', () => {
    def('customer', customerFactory)

    beforeEach(() => {
      (updateProfile as any).mockResolvedValue(get.customer)
    })

    it('updates profile', async () => {
      const { result } = get.subject

      await act(async () => { await result.current.updateProfile(get.params) })

      expect(updateProfile).toBeCalledWith({
        firstName: 'John',
        lastName: 'Smith',
        birthday: get.params.birthday
      })

      expect(get.updateUser).toBeCalledWith(get.customer)
    })
  })

  describe('Failure', () => {
    def('error', () => 'Api error')
    def('response', () => baseErrorFactory(get.error))

    def('params', () => ({
      fullName: 'John Smith',
      birthday: '2010-10-10',
    }))

    beforeEach(() => {
      (updateProfile as any).mockRejectedValue(get.response)
    })

    it('returns api form error', async () => {
      const { updateProfile } = get.subject.result.current
      expect(await updateProfile(get.params)).toEqual({ [FORM_ERROR]: get.error })
    })
  })
})
