import React from'react'
import stylesBlock from 'utils/stylesBlock'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import DialogConten from './components/DialogContent'
import styles from './ConfirmDialog.module.scss'

interface IProps {
  visible: boolean
  hide: () => void
  onConfirm: () => void
}

const b = stylesBlock(styles)

const ConfirmDialog: React.FC<IProps> = ({ visible, hide, onConfirm }) => (
  <ConfirmDialogWrapper
    className={b('dialog')}
    open={visible}
    onClose={hide}
  >
    <ConfirmDialogContent className={b('content')}>
      <DialogConten />
    </ConfirmDialogContent>
    <ConfirmDialogActions>
      <ConfirmDialogButton onClick={onConfirm}>I accept</ConfirmDialogButton>
    </ConfirmDialogActions>
  </ConfirmDialogWrapper>
)

export default ConfirmDialog
