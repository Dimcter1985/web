import React, { forwardRef } from 'react'
import block from 'utils/stylesBlock'
import RouterLink, { IProps as IRouterLinkProps } from 'components/RouterLink'
import Link, { IProps as ILinkProps } from 'components/Link'

import HeaderText from '../HeaderText'

import styles from './navItem.module.scss'

interface IProps extends Omit<IRouterLinkProps, 'href'> {
  external?: boolean
  className?: string,
  textClassName?: string
  hidden?: 'mobile' | 'desktop' | 'none',
  href?: string
  proxyRef?: ILinkProps['ref'],
  onClick?: () => void,
}

const cls = block(styles)

const HeaderNavItem: React.FC<IProps> = forwardRef<any, IProps>(({ 
  external,
  className,
  textClassName,
  hidden = 'mobile', 
  href, 
  proxyRef, 
  onClick,
  children, 
}, ref) => {

  const text = <HeaderText className={textClassName}>{ children }</HeaderText>

  if (external && href) {
    return (
      <div className={cls('item', { hidden }, className)} ref={ref}>
        <Link 
          href={href}
          blank
          underline='none'
        >
          { text }
        </Link>
      </div>
    )
  } 

  if (href) {
    return (
      <div className={cls('item', { hidden }, className)} ref={ref}>
        <RouterLink 
          href={href}
          link={{ underline: 'none' }}
        >
          { text }
        </RouterLink>
      </div>
    )
  } 
  
  return (
    <div className={cls('item', { hidden }, className)} ref={ref}>
      <Link underline='none' component='button' ref={proxyRef} onClick={onClick}>
        { text }
      </Link>
    </div>
  )
  
})

export default HeaderNavItem
