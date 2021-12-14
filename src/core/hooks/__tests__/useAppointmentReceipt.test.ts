import { renderHook } from '@testing-library/react-hooks'
import { listAppointmentFactory } from 'core/spec'
import useAppointmentReceipt from '../useAppointmentReceipt'

describe('useAppointmentReceipt', () => {
  const appointment = listAppointmentFactory()

  def('subject', () => renderHook(() => useAppointmentReceipt(appointment)))

  it('returns receipt details', () => {
    const { current } = get.subject.result

    expect(current).toHaveProperty('subtotal')
    expect(current).toHaveProperty('credits')
    expect(current).toHaveProperty('discount')
    expect(current).toHaveProperty('serviceFee')
    expect(current).toHaveProperty('loyalty')
    expect(current).toHaveProperty('tip')
    expect(current).toHaveProperty('taxes')
    expect(current).toHaveProperty('total')
  })
})
