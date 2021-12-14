export const CHECKOUT_APPOINTMENT_QUERY_FIELDS = `
  cost
  credits
  cardFingerprintId
  loyaltyCardId
  loyaltyDiscount
  discount {
    amount
    code
    id
  }
  referralCode
  referralDiscount
  specialRequests
  tip
`