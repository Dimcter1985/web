import { useContext } from 'react'

import Context, { IContext } from '../contexts/salon'

const useCurrentSalon = (): IContext['salon'] => {
  return useContext(Context).salon
}

export default useCurrentSalon
