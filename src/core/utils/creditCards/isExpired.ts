import moment from 'moment'

const isExpired = ({ expiresAt }: ICreditCard): boolean => expiresAt.split('-').reverse().join('') < moment().format('YYMM')

export default isExpired