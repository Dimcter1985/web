import React from 'react'

import Link, { IProps as ILinkProps } from 'components/Link'
import ExternalLink from 'components/ExternalLink'
import stylesBlock from 'utils/stylesBlock'

import styles from './styles.module.scss'

interface IProps extends ILinkProps {
  href: string
  external?: boolean
}

const b = stylesBlock(styles)

const FooterLink: React.FC<IProps> = ({ children, external, className, ...props }) => {
  const Component = external ? ExternalLink : Link
  return (
    <Component {...props} className={b('link', null, className)}>
      {children}
    </Component>
  )
}

export default FooterLink