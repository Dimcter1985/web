import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import { commonServiceFactory, def, get, storage, waitFor } from 'core/spec'
import Storage from 'utils/storage'
import { StorageProvider } from 'core/contexts/Storage'
import useRecentSearchedServices from '../useRecentSearchedServices'

describe('useRecentSearchedServices', () => {
  const wrapper: React.FC = ({ children }) => (
    <StorageProvider storage={new Storage(storage, {})}>
      {children}
    </StorageProvider>
  )

  def('subject', () => renderHook(useRecentSearchedServices, { wrapper }))

  const manicure = commonServiceFactory({ name: 'Manicure' })
  const pedicure = commonServiceFactory({ name: 'Pedicure' })
  const eyebrow = commonServiceFactory({ name: 'Eyebrow' })
  const gelSoakoff = commonServiceFactory({ name: 'Gel Soak Off' })
  const polishChange = commonServiceFactory({ name: 'Polish Change' })
  const massage = commonServiceFactory({ name: 'Massage' })

  it('has correct initial state', async () => {
    await waitFor(() => {
      const { current } = get.subject.result
      expect(current.searchedServices).toEqual([])
      expect(typeof current.addSearchedService).toEqual('function')
      expect(typeof current.removeSearchedService).toEqual('function')
    })
  })

  describe('Handles searched services', () => {
    it('adds and removes the searched service from recent services', async () => {
      const { result } = get.subject

      const addService = async (service: ICommonService): Promise<void> => {
        await act(async () => {
          await result.current.addSearchedService(service)
        })
      }

      const removeService = async (serviceId: number): Promise<void> => {
        await act(async () => {
          await result.current.removeSearchedService(serviceId)
        })
      }

      await act(async () => {
        await addService(manicure)
      })

      expect(result.current.searchedServices).toEqual([manicure])

      await act(async () => {
        await addService(pedicure)
      })
      expect(result.current.searchedServices).toEqual([pedicure, manicure])

      await act(async () => {
        await removeService(pedicure.id)
      })
      expect(result.current.searchedServices).toEqual([manicure])

      await act(async () => {
        await addService(pedicure)
        await addService(eyebrow)
        await addService(eyebrow)
        await addService(eyebrow)
        await addService(gelSoakoff)
        await addService(polishChange)
      })
      expect(result.current.searchedServices).toEqual([
        polishChange,
        gelSoakoff,
        eyebrow,
        pedicure,
        manicure,
      ])

      await act(async () => {
        await addService(massage)
      })
      expect(result.current.searchedServices).toEqual([
        massage,
        polishChange,
        gelSoakoff,
        eyebrow,
        pedicure,
      ])
    })
  })

  describe('With recent search services', () => {
    const storedServices = [manicure, pedicure]

    beforeEach(() => {
      jest
        .spyOn(storage, 'getItem')
        .mockResolvedValue(JSON.stringify(storedServices))
    })

    it('has correct initial state', async () => {
      await act(async () => {
        await waitFor(() => {
          const { current } = get.subject.result
          expect(current.searchedServices).toEqual(storedServices)
        })
      })
    })
  })
})
