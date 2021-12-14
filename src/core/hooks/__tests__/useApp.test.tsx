import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import { def, get, storage, userFactory, waitFor } from 'core/spec'
import { StorageProvider } from 'core/contexts/Storage'
import Storage from 'utils/storage'
import { AppProvider } from 'core/contexts/App'
import useApp from '../useApp'

describe('useApp', () => {
  const wrapper: React.FC = ({ children }) => (
    <StorageProvider storage={new Storage(storage, { ENVIRONMENT: 'test' })}>
      <AppProvider>
        {children}
      </AppProvider>
    </StorageProvider>
  )

  def('user', userFactory)

  def('subject', () => renderHook(() => useApp(), { wrapper }))

  it('has correct initial state', async () => {
    await act(async () => {
      await waitFor(() => {
        expect(get.subject.result.current).toEqual(
          expect.objectContaining({
            isLogged: false,
            user: null,
            userId: null,
            ready: true,
          }),
        )
      })
    })
  })

  describe('With user data', () => {
    beforeEach(() => {
      jest
        .spyOn(storage, 'getItem')
        .mockResolvedValue(JSON.stringify(get.user))
    })

    it('loads user data from local storage', async () => {
      await act(async () => {
        await waitFor(() => {
          const { user, userId, isLogged } = get.subject.result.current as IAppContext

          expect(user).toEqual(get.user)
          expect(userId).toEqual(get.user.id)
          expect(isLogged).toEqual(true)
        })
      })
    })

    it('updates user data', async () => {
      const updatedFields = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        birthday: new Date().toISOString(),
        points: 10,
      }

      await act(async () => {
        await waitFor(() => {
          const { user, updateUser } = get.subject.result.current as IAppContext
          expect(user).toEqual(get.user)

          act(() => { updateUser({ ...get.user, ...updatedFields }) })

          const { user: updatedUser } = get.subject.result.current as IAppContext
          expect(updatedUser).toEqual({ ...get.user, ...updatedFields })
        })
      })
    })

    it('does log out and remove data from the store', async () => {
      await act(async () => {
        await waitFor(() => {
          const { user, userId, isLogged, logOut } = get.subject.result.current as IAppContext

          act(() => { logOut() })

          expect(user).toEqual(null)
          expect(userId).toEqual(null)
          expect(isLogged).toEqual(false)
        })
      })
    })
  })

  describe('Without user data', () => {

    it('does log in and save data to the store', async () => {
      await act(async () => {
        await waitFor(() => {
          const { user, userId, isLogged, logIn } = get.subject.result.current as IAppContext

          act(() => { logIn(get.user) })

          expect(user).toEqual(get.user)
          expect(userId).toEqual(get.user.id)
          expect(isLogged).toEqual(true)
        })
      })
    })
  })
})
