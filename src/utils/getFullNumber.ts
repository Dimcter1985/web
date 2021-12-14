const getFullNumber = (code: string, mobile: string): string => (
  `+${code}${mobile.replace(/[\s()]/g, '')}`
)

export default getFullNumber
