import React from 'react'
import { Form } from 'react-final-form'
import { act, renderHook } from '@testing-library/react-hooks'

import { def, discountFactory, get } from 'spec'
import fetchPromo from 'core/api/promo/fetchPromo'
import usePromoCode from '../usePromoCode'

jest.mock('core/api/promo/fetchPromo', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('usePromoCode', () => {
  const wrapper: React.FC = ({ children }) => (
    <Form
      onSubmit={jest.fn}
      render={() => children}
    />
  )

  beforeEach(() => {
    // @ts-ignore
    fetchPromo.mockResolvedValue(get.discount)
  })

  const code = 'ABC'
  def('discount', () => discountFactory({ code }))

  def('params', () => ({
    salonId: 1,
    services: [{ serviceId: 2, quantity: 2 }, { serviceId: 3, quantity: 3 }],
  }))

  def('subject', () => renderHook(() => usePromoCode(get.params), { wrapper } ))

  it('correct default values', () => {
    const { current } = get.subject.result

    expect(current.error).toEqual(undefined)
    expect(current.submitted).toEqual(false)
    expect(typeof current.checkCode).toEqual('function')
    expect(typeof current.resetCode).toEqual('function')
  })

  it('applies the same promo code two times', async () => {
    const { result } = get.subject

    await act(async () => {
      await result.current.checkCode(code)
    })
    expect(fetchPromo).toBeCalledWith({
      referral: { code },
      discount: { code, salonId: 1, services: [{ serviceId: 2, quantity: 2 }, { serviceId: 3, quantity: 3 }] },
    })
    expect(fetchPromo).toBeCalledTimes(1)
    expect(result.current.submitted).toEqual(true)

    act(() => {
      result.current.resetCode(code)
    })
    expect(result.current.submitted).toEqual(false)

    await act(async () => {
      await result.current.checkCode(code)
    })

    expect(fetchPromo).toBeCalledTimes(1)
    expect(result.current.submitted).toEqual(true)
  })
})