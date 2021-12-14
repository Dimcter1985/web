import React, { createContext } from 'react'
import dynamic from 'next/dynamic'
import useVisibility from 'hooks/useVisibility'

export interface IAuthDialogContext {
  visible: boolean
  show: () => void
  hide: () => void
}

const AuthDialog = createContext({} as IAuthDialogContext)

const DynamicAuthDialog = dynamic(
  () => import('widgets/AuthenticationDialog'),
  { ssr: false },
)

const AuthDialogProvider: React.FC = ({ children }) => {
  const { visible, show, hide } = useVisibility(false)

  const value: IAuthDialogContext = {
    visible,
    show,
    hide,
  }

  return (
    <AuthDialog.Provider value={value}>
      { children }
      { visible && <DynamicAuthDialog visible={visible} onClose={hide} /> }
    </AuthDialog.Provider>
  )
}

export { AuthDialogProvider }

export default AuthDialog