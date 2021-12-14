export const LIST_REWARD_QUERY_FIELDS = `
  id
  cost
  credits
`

export const REDEMPTION_QUERY_FIELDS = `
  id
  reward { ${LIST_REWARD_QUERY_FIELDS} }
`