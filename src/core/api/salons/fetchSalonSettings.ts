import buildQuery from 'core/utils/api/buildQuery'

const query = `
  query SalonSettings($salonId: Int!) {
    salonSettings(salonId: $salonId) {
      appointmentServicesLimit
      cancelationFee
      cancelationFeePeriod
      cancelationFeeType
      getPaidVisibleFrom
      noShowFee
      noShowFeeType
      noShowVisibleFrom
      pointsByReview
      processingFixed
      processingRelative
    }
  }
`

interface IParams {
  salonId: number
}

const fetchSalonSettings = <T>({ ...params }: IParams): Promise<T> => (
  buildQuery<T>({ query, ...params })
)

export default fetchSalonSettings
