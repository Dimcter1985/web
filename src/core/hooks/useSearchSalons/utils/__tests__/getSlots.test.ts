import { freeSlotsFactory } from 'core/spec'
import getSlots from '../getSlots'

describe('getSlots', () => {
  it('returns correct slots', () => {
    const slot1 = '2020-12-02T10:00:00-05:00'
    const slot2 = '2020-12-02T11:00:00-05:00'
    const slot3 = '2020-12-02T12:00:00-05:00'

    const { salon, slots } = freeSlotsFactory({
      slots: [
        {
          slots: [slot1, slot2],
          technicianId: 1,
        },
        {
          slots: [slot1, slot3],
          technicianId: 2,
        },
      ]
    })

    expect(getSlots(slots, salon)).toEqual([
      {
        date: slot1,
        slot: 600,
        technicianId: 1,
      },
      {
        date: slot2,
        slot: 660,
        technicianId: 1,
      },
      {
        date: slot3,
        slot: 720,
        technicianId: 2,
      },
    ])
  })
})
