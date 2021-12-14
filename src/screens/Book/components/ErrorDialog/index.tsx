import React from'react'
import stylesBlock from 'utils/stylesBlock'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import styles from './ErrorDialog.module.scss'

interface IProps {
  visible: boolean
  hide: () => void
}

const b = stylesBlock(styles)

const ErrorDialog: React.FC<IProps> = ({ visible, hide }) => (
  <ConfirmDialogWrapper
    className={b('dialog')}
    classes={{ paper: b('paper') }}
    open={visible}
    onClose={hide}
  >
    <ConfirmDialogContent className={b('content')}>
      Please, select tip amount.
      <br />
      <br />
      Thank you!
    </ConfirmDialogContent>
    <ConfirmDialogActions className={b('button-wrapper')}>
      <ConfirmDialogButton className={b('button')} onClick={hide}>Ok</ConfirmDialogButton>
    </ConfirmDialogActions>
  </ConfirmDialogWrapper>
)

export default ErrorDialog
