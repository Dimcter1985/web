import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import { categoryFactory, commonServiceFactory, waitFor } from 'core/spec'
import { SearchServicesProvider } from 'core/contexts/SearchServices'
import fetchCategories from 'core/api/categories/fetchCategories'
import { ServicesProvider } from 'core/contexts/Services'
import useSearchServices from '../useSearchServices'

jest.mock('core/api/categories/fetchCategories', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useSearchServices', () => {
  const wrapper: React.FC = ({ children }) => (
    <ServicesProvider>
      <SearchServicesProvider>
        {children}
      </SearchServicesProvider>
    </ServicesProvider>
  )

  def('subject', () => renderHook(useSearchServices, { wrapper }))

  const manicure = commonServiceFactory({ name: 'Manicure' })
  const specialManicure = commonServiceFactory({ name: 'Special Manicure' })
  const gelSoakOFf = commonServiceFactory({ name: 'Gel Soak Off' })

  const pedicure = commonServiceFactory({ name: 'Pedicure' })
  const spaPedicure = commonServiceFactory({ name: 'Spa Pedicure' })
  const specialPedicure = commonServiceFactory({ name: 'Special Pedicure' })

  const categories = [
    categoryFactory({
      name: 'Hands',
      services: [manicure, specialManicure, gelSoakOFf],
    }),
    categoryFactory({
      name: 'Feet',
      services: [pedicure, spaPedicure, specialPedicure],
    }),
  ]

  beforeEach(() => {
    // @ts-ignore
    fetchCategories.mockResolvedValue({
      data: categories,
      total: categories.length,
    })
  })

  it('submits empty search query', async () => {
    const { result } = get.subject

    await act(async () => {
      await waitFor(() => {
        act(() => { result.current.submitSearch('') })
        expect(result.current.searchResults).toEqual([])
      })
    })
  })

  it('searches for `manicure`', async () => {
    const { result } = get.subject
    await act(async () => {
      await waitFor(() => {
        act(() => { result.current.submitSearch('manicure') })
        expect(result.current.searchResults).toEqual([manicure, specialManicure])
      })
    })
  })

  it('searches for `special`', async () => {
    const { result } = get.subject
    await act(async () => {
      await waitFor(() => {
        act(() => { result.current.submitSearch('special') })
        expect(result.current.searchResults).toEqual([specialManicure, specialPedicure])
      })
    })
  })

  it('searches for `manicure`', async () => {
    const { result } = get.subject
    await act(async () => {
      await waitFor(() => {
        act(() => { result.current.submitSearch('manicure') })
        expect(result.current.searchResults).toEqual([manicure, specialManicure])
      })
    })
  })

  it('searches for `soak`', async () => {
    const { result } = get.subject
    await act(async () => {
      await waitFor(() => {
        act(() => { result.current.submitSearch('soak') })
        expect(result.current.searchResults).toEqual([gelSoakOFf])
      })
    })
  })

  it('searches for `pedicure`', async () => {
    const { result } = get.subject
    await act(async () => {
      await waitFor(() => {
        act(() => { result.current.submitSearch('pedicure') })
        expect(result.current.searchResults).toEqual([
          pedicure,
          spaPedicure,
          specialPedicure,
        ])
      })
    })
  })
})
