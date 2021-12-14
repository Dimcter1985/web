import { useContext } from 'react'

import Services from 'core/contexts/Services'

const useServices = (): IServicesContext => (
  useContext(Services)
)

export default useServices