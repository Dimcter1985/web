import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { GeolocationProvider } from 'core/contexts/Geolocation'
import { geolocation, salonFactory, waitFor } from 'core/spec'
import { DEFAULT_POSITION } from 'core/consts'
import App from 'core/contexts/App'
import { StorageProvider } from 'core/contexts/Storage'

import useGeolocation, { IUseGeolocation } from '../useGeolocation'



describe('useServices', () => {
  def('appContext', () => ({
    isLogged: get.isLogged,
  }))
  def('storage', () => ({
    getItem: () => Promise.resolve(null),
  }))

  const wrapper: React.FC = ({ children }) => (
    <App.Provider value={get.appContext}>
      <StorageProvider storage={get.storage}>
        <GeolocationProvider
          canFetchGeolocation={get.canFetchGeolocation}
          geolocation={geolocation}
        >
          {children}
        </GeolocationProvider>
      </StorageProvider>
    </App.Provider>
  )

  def('subject', () => renderHook(() => useGeolocation(), { wrapper }))

  describe('Without user', () => {
    def('isLogged', () => false)

    it('doesnt fetch user location', async () => {
      expect(get.subject).toBeTruthy()

      await waitFor(() => {
        expect(geolocation.getCurrentPosition).not.toBeCalled()
      })
    })
  })

  describe('With user', () => {
    def('isLogged', () => true)
    def('salon', () => salonFactory({
      location: {
        lat: DEFAULT_POSITION.lat + 0.1,
        lng: DEFAULT_POSITION.lat,
      },
    }))

    beforeEach(jest.clearAllMocks)

    it('calculates distance between two points', async () => {
      const { getDestinaceToSalon } = get.subject.result.current as IUseGeolocation
      await waitFor(() => {
        expect(getDestinaceToSalon(get.salon.location)).toEqual(5472.5)
      })
    })

    describe('With disabled fetch geolocation', () => {
      def('canFetchGeolocation', () => jest.fn().mockResolvedValue(false))

      it('doesnt fetch geolocation', async () => {
        expect(get.subject).toBeTruthy()

        await waitFor(() => {
          expect(geolocation.getCurrentPosition).not.toBeCalled()
        })
      })
    })
  })
})