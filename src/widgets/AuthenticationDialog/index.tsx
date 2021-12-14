import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'

import useAuth from 'core/hooks/useAuth'
import useMediaQueries from 'hooks/useMediaQueries'
import useDelayAction from 'hooks/useDelayAction'

import BlackTheme from 'components/BlackTheme'
import DialogWithMobileHeader from 'components/DialogWithMobileHeader'
import PhoneNumberForm from './components/PhoneNumberForm'
import CodeForm from './components/CodeForm'
import RegistrationForm from './components/RegistrationForm'
import Finish from './components/Finish'

import styles from './AuthenticationDialog.module.scss'

interface IProps {
  visible: boolean
  onClose: () => void
}

const b = stylesBlock(styles)

const AuthenticationDialog: React.FC<IProps> = ({ visible, onClose }) => {
  const {
    step,
    phoneNumber,
    errorMessage,
    sendCode,
    onCodeChange,
    resendCode,
    backToStartStep,
    signUp,
  } = useAuth({ onClose })

  const { isSmallScreen } = useMediaQueries()
  const { clearAction } = useDelayAction()

  const closeHandler = useCallback(() => {
    onClose()
    clearAction()
  }, [onClose, clearAction])

  return (
    <BlackTheme>
      <DialogWithMobileHeader
        visible={visible}
        onClose={onClose}
        fullScreen={isSmallScreen}
        hideCross={step === 'code' || step === 'signup'}
      >
        <div className={b('container')}>
          { step === 'phone' &&
            <PhoneNumberForm
              errorMessage={errorMessage}
              sendCode={sendCode}
              onClose={closeHandler}
            />
          }
          { step === 'code' &&
            <CodeForm
              phoneNumber={phoneNumber}
              errorMessage={errorMessage}
              onCodeChange={onCodeChange}
              resendCode={resendCode}
              onBack={backToStartStep}
            />
          }
          { step === 'signup' && <RegistrationForm onSubmit={signUp} onBack={backToStartStep} /> }
          { step === 'finish' && <Finish onClose={onClose} />}
        </div>
      </DialogWithMobileHeader>
    </BlackTheme>
  )
}

export default AuthenticationDialog
