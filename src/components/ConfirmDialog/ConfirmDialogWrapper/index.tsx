import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { DialogProps } from '@material-ui/core/Dialog'
import Dialog from 'components/Dialog/Dialog'
import BlackTheme from 'components/BlackTheme'
import PureButton from 'components/PureButton'
import styles from './ConfirmDialogWrapper.module.scss'

interface IProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  classes?: DialogProps['classes']
}

const b = stylesBlock(styles)

const ConfirmDialogWrapper: React.FC<IProps> = ({ open, onClose, className, classes, children }) => (
  <Dialog maxWidth={false} classes={{ ...classes, paper: b('root', classes?.paper) }} open={open}>
    <BlackTheme className={b('container', className)}>
      <PureButton className={b('close-button')} onClick={onClose}>Close</PureButton>
      { children }
    </BlackTheme>
  </Dialog>
)

export default ConfirmDialogWrapper
