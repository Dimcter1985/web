import { useMemo } from 'react'
import range from 'lodash/range'
import moment from 'moment'

import isSameDay from 'core/utils/dateTime/isSameDay'
import daysDiff from 'core/utils/dateTime/daysDiff'

interface IUseDaysList {
  daysList: Date[]
}

interface IParams {
  calendarDay: Date
}

const useDaysList = ({ calendarDay }: IParams): IUseDaysList => {
  const isSameDays = isSameDay(calendarDay)

  const daysDifference = useMemo(() => {
    if (isSameDays) return 0
    const difference = daysDiff(calendarDay)
    return difference >= 2 ? 2 : difference
  }, [isSameDays, daysDiff, calendarDay])

  const daysList = useMemo(() => (
    range(-daysDifference, 7 - daysDifference).map(day => (
      moment(isSameDays ? undefined : calendarDay)
        .add(day, 'd')
        .toDate()
    ))
  ), [isSameDays, daysDifference, calendarDay])

  return {
    daysList,
  }
}

export default useDaysList