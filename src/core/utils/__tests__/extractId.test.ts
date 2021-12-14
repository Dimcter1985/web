import extractId from '../extractId'

describe('extractId', () => {
  it('return string value', () => {
    expect(extractId({ id: 12345 })).toEqual('12345')
  })
})
