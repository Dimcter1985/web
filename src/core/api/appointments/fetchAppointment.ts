import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Appointment($id: Int!) {
    appointment(id: $id) {
      ${queryFields}
    }
  }
`

interface IParams {
  queryFields: string
  id: number
}

const fetchAppointment = <T>({ queryFields, ...params }: IParams): Promise<T> => (
  buildQuery<T>({ query: query(queryFields), ...params })
)

export default fetchAppointment
