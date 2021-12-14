import { useContext } from 'react'
import Context, { IContext } from 'contexts/search'

const useSearch = (): IContext => (
  useContext(Context)
)

export default useSearch
