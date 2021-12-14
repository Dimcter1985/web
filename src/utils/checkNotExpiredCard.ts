import moment, { Moment } from 'moment'

const checkNotExpiredCard = (payDate: Moment, cardDate: string) => (
  payDate < moment(cardDate, 'MM-YY').endOf('month')
)

export default checkNotExpiredCard
