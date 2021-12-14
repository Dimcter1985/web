import moment, { Moment } from 'moment'

class DateTimeRange {
  from: Moment

  to: Moment

  static build (from: Date | string, to: Date | string): DateTimeRange {
    return new DateTimeRange(from, to)
  }

  constructor (from: Date | string, to: Date | string) {
    this.from = moment(from)
    this.to = moment(to)
  }

  includes (date: Moment): boolean {
    return this.from <= date && date <= this.to
  }
}

export default DateTimeRange