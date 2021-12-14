import moment from 'moment'
import DateTimeRange from '../dateTimeRange'

describe('dateTimeRange', () => {
  it('has a date in the range', () => {
    const range = DateTimeRange.build(
      new Date('December 2, 2020').toISOString(),
      new Date('December 10, 2020').toISOString(),
    )

    let expectedDate = moment(new Date('December 1, 2020').toISOString())
    expect(range.includes(expectedDate)).toBeFalsy()

    expectedDate = moment(new Date('December 2, 2020').toISOString())
    expect(range.includes(expectedDate)).toBeTruthy()

    expectedDate = moment(new Date('December 8, 2020').toISOString())
    expect(range.includes(expectedDate)).toBeTruthy()

    expectedDate = moment(new Date('December 10, 2020').toISOString())
    expect(range.includes(expectedDate)).toBeTruthy()

    expectedDate = moment(new Date('December 11, 2020').toISOString())
    expect(range.includes(expectedDate)).toBeFalsy()
  })
})
