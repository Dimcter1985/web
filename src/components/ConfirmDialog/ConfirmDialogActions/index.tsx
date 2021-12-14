import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import styles from './ConfirmDialogActions.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const ConfirmDialogActions: React.FC<IProps> = ({ className, children }) => (
  <div className={b('actions', className)}>
    { children }
  </div>
)

export default ConfirmDialogActions
