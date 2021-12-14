import { useContext, useMemo } from 'react'
import moment, { Moment } from 'moment-timezone'
import minutesFromStartOfDay from 'utils/minutesFromStartOfDay'
import { DEFAULT_TIMEZONE } from 'consts'

import { IContext, Context } from 'contexts/cart'

interface IAdditionalParams {
  technicianId: number | null
  startsAt: Moment | null
  startsAtInTZ: Moment | null
  slot: number | null
}

const useCart = (timezone: string = DEFAULT_TIMEZONE): IContext & IAdditionalParams => {
  const context = useContext(Context)
  const { timeSlot, inContext } = context

  if (!inContext) { throw new Error('Use Cart no context') }

  const technicianId = useMemo(() => {
    if (!timeSlot) { return null }
    return timeSlot.technicianId
  }, [timeSlot])

  const startsAt = useMemo(() => (
    timeSlot ? moment(timeSlot.startsAt) : null
  ), [timeSlot?.startsAt])

  const startsAtInTZ = useMemo(() => {
    if (!startsAt) { return null }
    return startsAt.tz(timezone)
  }, [timezone, startsAt])

  const slot = useMemo(() => {
    if (!startsAtInTZ) { return null }
    return minutesFromStartOfDay(startsAtInTZ)
  }, [startsAtInTZ, minutesFromStartOfDay])

  return {
    ...context,
    technicianId,
    startsAt,
    startsAtInTZ,
    slot,
  }
}

export default useCart
