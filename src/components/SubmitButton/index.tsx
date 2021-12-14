import React from 'react'

import PureButton from 'components/PureButton'
import Link from 'components/Link'
import block from 'utils/stylesBlock'
import styles from './styles.module.scss'

const b = block(styles)

interface IProps extends ButtonProps {
  href?: string
  theme?: 'black' | 'pink' | 'white'
  size?: 'small' | 'large'
}

const SubmitButton: React.FC<IProps> = ({ children, className, href, theme = 'black', size = 'small', ...props }) => {
  const buttonStyles = b('submit', { theme, size }, className)
  if (!href) {
    return (
      <PureButton className={buttonStyles} {...props}>
        {children}
      </PureButton>
    )
  }
  return (
    <Link href={href} className={buttonStyles} {...props as typeof Link}>
      {children}
    </Link>
  )
}

export default SubmitButton