import PureLink, { IProps as LinkProps } from 'components/PureLink'
import Link, { IProps as ILinkProps } from 'components/Link'
import stylesBlock from 'utils/stylesBlock'

import styles from './routerLink.module.scss'

export interface IProps extends LinkProps {
  className?: ILinkProps['className']
  forwardRef?: ILinkProps['ref']
  link?: ILinkProps
  variant?: 'touch'
}

const b = stylesBlock(styles)

const RouterLink: React.FC<IProps> = ({ 
  className, 
  href, 
  forwardRef, 
  link, 
  variant, 
  children, 
  ...props 
}) => {
  
  const linkHref = typeof href === 'string' ? href : undefined

  return (
    <PureLink 
      href={href}
      passHref
      {...props}
    >
      <Link
        className={b('link', { variant }, className)}
        ref={forwardRef}
        href={linkHref}
        {...link}
      >
        { children }
      </Link>
    </PureLink>
  )
}

export default RouterLink