import getSalonBenefits from '../getSalonBenefits'

describe('getSalonBenefits', () => {
  it('with tipping', () => {
    const salon = { tipping: true }
    expect(getSalonBenefits(salon)).toEqual(['TIP IN-APP'])
  })

  it('with loyalty program', () => {
    const salon = { tipping: false, activeLoyaltyProgram: { id: 1 } }
    expect(getSalonBenefits(salon)).toEqual(['LOYALTY CARD'])
  })

  it('with tipping and loyalty program', () => {
    const salon = { tipping: true, activeLoyaltyProgram: { id: 1 } }
    expect(getSalonBenefits(salon)).toEqual(['TIP IN-APP', 'LOYALTY CARD'])
  })
})
