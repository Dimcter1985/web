import { useContext } from 'react'

import App from 'core/contexts/App'

const useApp = (): IAppContext => (
  useContext(App)
)

export default useApp