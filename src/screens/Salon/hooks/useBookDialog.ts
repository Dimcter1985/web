import { useContext } from 'react'

import Context, { IContext } from '../contexts/page'

type IUseHook = Pick<IContext, 'openTimeDialog' | 'closeTimeDialog'>

const useBookDialog = (): IUseHook => {
  const {  openTimeDialog, closeTimeDialog } = useContext(Context)

  return { openTimeDialog, closeTimeDialog }
}

export default useBookDialog
