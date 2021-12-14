import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button'

export type ButtonProps = MuiButtonProps

const Button: React.FC<ButtonProps> = ({ variant = 'contained', color = 'primary', ...props }) => (
  <MuiButton
    variant={variant}
    color={color}
    {...props}
  />
)

export default Button
