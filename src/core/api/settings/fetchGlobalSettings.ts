import { GLOBAL_SETTINGS_QUERY_FIELDS } from 'core/api/consts/settings'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query GlobalSettings {
    globalSettings {
      ${queryFields}
    }
  }
`

interface IParams {
  queryFields?: string
}

const fetchGlobalSettings = <T = IGlobalSettings>({
  queryFields = GLOBAL_SETTINGS_QUERY_FIELDS,
}: IParams = {}): Promise<T> => (
  buildQuery<T>({ query: query(queryFields) })
)

export default fetchGlobalSettings
