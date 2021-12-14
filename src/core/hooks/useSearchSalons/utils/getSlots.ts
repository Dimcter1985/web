import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import moment from 'moment-timezone'

import minutesFromStartOfDay from 'core/utils/dateTime/minutesFromStartOfDay'
import { IExtendedTimeSlot } from '..'

export default function getSlots(slots: IFreeSlot[], salon: IListFreeSlot['salon']): IExtendedTimeSlot[] {

  return uniqBy(flatten(
    slots.map(({ slots: availableSlots, technicianId }) => (
      availableSlots.map((slot) => ({
        slot: minutesFromStartOfDay(moment(slot).tz(salon.timezone)),
        date: slot,
        technicianId,
      }))
    )),
  ), 'slot')
}