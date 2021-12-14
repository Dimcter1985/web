import { useContext } from 'react'

import Context from '../contexts/page'

const useServicesDialog = () => {
  const { openServicesDialog } = useContext(Context)
  return { openServicesDialog }
}

export default useServicesDialog
