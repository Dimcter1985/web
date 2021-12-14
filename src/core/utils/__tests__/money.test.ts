import money from '../money'

describe('money', () => {
  it('formats correctly', () => {
    expect(money(0)).toEqual('$0.00')
    expect(money(0.5)).toEqual('$0.50')
    expect(money(1)).toEqual('$1.00')
    expect(money(20)).toEqual('$20.00')
    expect(money(1200)).toEqual('$1,200.00')
    expect(money(12000)).toEqual('$12,000.00')
    expect(money(120000)).toEqual('$120,000.00')
  })
})
