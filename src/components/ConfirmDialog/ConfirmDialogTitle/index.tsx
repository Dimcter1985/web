import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import DialogTitle from '@material-ui/core/DialogTitle'
import styles from './ConfirmDialogTitle.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const ConfirmDialogTitle: React.FC<IProps> = ({ className, children }) => (
  <DialogTitle disableTypography className={b('title', className)}>
    { children }
  </DialogTitle>
)

export default ConfirmDialogTitle
