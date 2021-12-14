export const TIME_FORMAT = 'h:mm A'
export const DAY_FORMAT = 'MMM. D'
export const DATE_FORMAT = 'MMM. D, YYYY'
export const FULL_DATE_FORMAT = 'MMMM D, YYYY'
export const FULL_DATE_TIME_FORMAT = 'MMMM D, YYYY h:mm A'

export const WEEK_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as IWeekDayAbbr[]

export const FULL_WEEK_DAYS = {
  'mon': 'Monday',
  'tue': 'Tuesday',
  'wed': 'Wednesday',
  'thu': 'Thursday',
  'fri': 'Friday',
  'sat': 'Saturday',
  'sun': 'Sunday',
} as {
  [key in IWeekDayAbbr]: string
}