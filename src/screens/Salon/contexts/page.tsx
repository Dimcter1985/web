import noop from 'lodash/noop'
import { createContext, useCallback, useState } from 'react'

import AppointmentDateTimeDialog from 'widgets/AppointmentDateTimeDialog'
import useRouter from 'hooks/useRouter'
import useVisibility from 'hooks/useVisibility'

import FixedInfo from '../components/FixedInfo'
import ServicesDialog from '../components/ServicesDialog'

export interface IContext {
  openTimeDialog: () => void
  closeTimeDialog: () => void
  openServicesDialog: () => void
}

const Context = createContext<IContext>({
  openTimeDialog: noop,
  closeTimeDialog: noop,
  openServicesDialog: noop,
})

const Provider: React.FC = ({ children }) => {

  const { push } = useRouter()
  const { visible, show, hide } = useVisibility(false)

  const [ isServicesDialogOpen, setIsServicesDialogOpen ] = useState<boolean>(false)

  const onContinue = useCallback(() => setTimeout(() => push('/book'), 100), [])

  const openServicesDialog = () => setIsServicesDialogOpen(true)
  const onServicesDialogClose = () => setIsServicesDialogOpen(false)

  const value: IContext = {
    openTimeDialog: show,
    closeTimeDialog: hide,
    openServicesDialog,
  }

  return (
    <Context.Provider value={value}>
      { children }
      <AppointmentDateTimeDialog 
        visible={visible}
        onClose={hide}
        onContinue={onContinue}
      />
      <FixedInfo />
      <ServicesDialog 
        visible={isServicesDialogOpen} 
        onClose={onServicesDialogClose}
      />
    </Context.Provider>
  )
}

export { Provider }

export default Context
