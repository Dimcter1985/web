import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import fetchCategories from 'core/api/categories/fetchCategories'
import { ServicesProvider } from 'core/contexts/Services'
import { categoryFactory, waitFor } from 'core/spec'
import useServices from '../useServices'

jest.mock('core/api/categories/fetchCategories', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useServices', () => {
  const wrapper: React.FC = ({ children }) => (
    <ServicesProvider>
      {children}
    </ServicesProvider>
  )

  def('subject', () => renderHook(() => useServices(), { wrapper }))

  it('has correct initial state', async () => {
    const { categories, services, fetchServices, loaded } = get.subject.result.current as IServicesContext

    await act(async () => {
      await waitFor(() => {
        expect(typeof fetchServices).toEqual('function')
        expect(categories).toEqual([])
        expect(services).toEqual([])
        expect(loaded).toEqual(false)
      })
    })
  })

  describe('With categories and services', () => {
    def('response', () => [categoryFactory])

    beforeEach(() => {
      // @ts-ignore
      fetchCategories.mockResolvedValue({ data: get.response })
    })

    it('loads data from the server', async () => {
      await act(async () => {
        await waitFor(() => {
          const { categories, services } = get.subject.result.current as IServicesContext

          expect(categories.length).toBeGreaterThan(0)
          expect(services.length).toBeGreaterThan(0)
        })
      })
    })

    it('re-fetches data', async () => {
      await act(async () => {
        await waitFor(() => {
          act(() => { get.subject.result.current.fetchServices() })
          expect(fetchCategories).toBeCalled()
        })
      })
    })
  })
})
