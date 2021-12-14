import { useContext } from 'react'
import AuthDialog, { IAuthDialogContext } from 'contexts/AuthDialog'

const useAuthDialog = (): IAuthDialogContext => (
  useContext(AuthDialog)
)

export default useAuthDialog