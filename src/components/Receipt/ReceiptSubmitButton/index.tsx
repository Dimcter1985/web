import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { ButtonProps } from '@material-ui/core/Button'
import Button from 'components/Button'
import styles from './ReceiptSubmitButton.module.scss'

const b = stylesBlock(styles)

const ReceiptSubmitButton: React.FC<ButtonProps> = ({ className, onClick, children, ...props }) => (
  <Button
    className={b('button', className)}
    onClick={onClick}
    size='large'
    {...props}
  >
    { children }
  </Button>
)

export default ReceiptSubmitButton
