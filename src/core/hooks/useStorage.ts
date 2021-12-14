import { useContext } from 'react'

import Storage from 'core/contexts/Storage'

const useStorage = (): IStorageContext => (
  useContext(Storage)
)

export default useStorage