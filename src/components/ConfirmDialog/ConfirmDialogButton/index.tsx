import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { ButtonProps } from '@material-ui/core/Button'
import Button from 'components/Button'
import styles from './ConfirmDialogButton.module.scss'

const b = stylesBlock(styles)

const ConfirmDialogButton: React.FC<ButtonProps> = ({ className, children, ...props }) => (
  <Button
    className={b('button', className)}
    size='large'
    {...props}
  >
    { children }
  </Button>
)

export default ConfirmDialogButton
