import { useContext } from 'react'

import { Context, IContext } from 'contexts/delayAction'

const useDelayAction = (): IContext => {
  return useContext(Context)
}

export default useDelayAction
