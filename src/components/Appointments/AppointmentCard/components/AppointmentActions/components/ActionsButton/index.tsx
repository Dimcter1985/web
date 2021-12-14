import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { ButtonProps } from '@material-ui/core/Button'
import RouterLink from 'components/RouterLink'
import Button from 'components/Button'
import styles from './ActionsButton.module.scss'

interface IProps extends ButtonProps {
  className?: string;
  href?: string;
  fullWidth?: boolean;
}

const b = stylesBlock(styles)

const ActionsButton: React.FC<IProps> = ({ className, href, fullWidth, children, ...props}) => {
  if (!href) { 
    return (
      <Button className={className} fullWidth {...props}>{ children }</Button>
    )
  }

  return (
    <RouterLink className={b('link', { fullWidth }, className)} href={href}>
      <Button className={b('button')} {...props}>{ children }</Button>
    </RouterLink>
  )
}

export default ActionsButton
