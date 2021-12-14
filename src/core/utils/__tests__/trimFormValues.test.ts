import trimFormValues from '../trimFormValues'

describe('trimFormValues', () => {
  it('returns correct values', () => {
    const data = {
      test1: '  Test 1',
      test2: 'Test 2  ',
      test3: '  Test 3  ',
    }
    expect(trimFormValues(data)).toEqual({
      test1: 'Test 1',
      test2: 'Test 2',
      test3: 'Test 3',
    })
  })
})
