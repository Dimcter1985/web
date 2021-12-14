import { renderHook } from '@testing-library/react-hooks'
import moment from 'moment'

import isSameDay from 'core/utils/dateTime/isSameDay'
import daysDiff from 'core/utils/dateTime/daysDiff'
import { DATE_FORMAT } from 'core/consts/dateTime'
import { def, get } from 'spec'
import useDaysList from '../useDaysList'

jest.mock('core/utils/dateTime/isSameDay', () => jest.fn())
jest.mock('core/utils/dateTime/daysDiff', () => jest.fn())

afterAll(jest.clearAllMocks)

function getFormattedDays(days: Date[]): string[] {
  return days.map(day => moment(day).format(DATE_FORMAT))
}

describe('useDaysList', () => {
  def('defaultDate', () => new Date('December 15, 2020'))

  def('subject', () => renderHook(() => useDaysList({
    calendarDay: get.calendarDay || get.defaultDate,
  })))

  describe('Initial state', () => {
    beforeEach(() => {
      (isSameDay as any).mockReturnValue(true)
    })

    it('has correct initial state', () => {
      const { result } = get.subject
      expect(result.current.daysList.length).toEqual(7)
    })
  })

  describe('Calendar day: today, Selected day: one day ahead', () => {
    def('calendarDay', () => new Date('December 1, 2020 10:00:00'))
    def('selectedDate', () => new Date('December 2, 2020 10:00:00'))

    beforeEach(() => {
      // @ts-ignore
      isSameDay.mockReturnValue(false)
      // @ts-ignore
      daysDiff.mockReturnValue(1)
    })

    it('returns correct days list', () => {
      const { result } = get.subject

      const days = getFormattedDays(result.current.daysList)
      expect(days).toEqual([
        'Nov. 30, 2020',
        'Dec. 1, 2020',
        'Dec. 2, 2020',
        'Dec. 3, 2020',
        'Dec. 4, 2020',
        'Dec. 5, 2020',
        'Dec. 6, 2020'
      ])
    })
  })

  describe('Calendar day: today, Selected day: two day ahead', () => {
    def('calendarDay', () => new Date('December 1, 2020 10:00:00'))
    def('selectedDate', () => new Date('December 3, 2020 10:00:00'))

    beforeEach(() => {
      // @ts-ignore
      isSameDay.mockReturnValue(false)
      // @ts-ignore
      daysDiff.mockReturnValue(2)
    })

    it('returns correct days list', () => {
      const { result } = get.subject

      const days = getFormattedDays(result.current.daysList)
      expect(days).toEqual([
        'Nov. 29, 2020',
        'Nov. 30, 2020',
        'Dec. 1, 2020',
        'Dec. 2, 2020',
        'Dec. 3, 2020',
        'Dec. 4, 2020',
        'Dec. 5, 2020',
      ])
    })
  })

  describe('Calendar day: today, Selected day: five day ahead', () => {
    def('calendarDay', () => new Date('December 20, 2020 10:00:00'))
    def('selectedDate', () => new Date('December 6, 2020 10:00:00'))

    beforeEach(() => {
      // @ts-ignore
      isSameDay.mockReturnValue(false)
      // @ts-ignore
      daysDiff.mockReturnValue(14)
    })

    it('returns correct days list', () => {
      const { result } = get.subject

      const days = getFormattedDays(result.current.daysList)
      expect(days).toEqual([
        'Dec. 18, 2020',
        'Dec. 19, 2020',
        'Dec. 20, 2020',
        'Dec. 21, 2020',
        'Dec. 22, 2020',
        'Dec. 23, 2020',
        'Dec. 24, 2020',
      ])
    })
  })
})
