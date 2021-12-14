import roundPrice from '../roundPrice'

describe('roundPrice', () => {
  it('returns correct value for 10.1234567', () => {
    expect(roundPrice(10.1234567)).toEqual(10.12)
  })

  it('returns correct value for 10.5557', () => {
    expect(roundPrice(10.5557)).toEqual(10.56)
  })
})
