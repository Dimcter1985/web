import MuiLink, { LinkProps } from '@material-ui/core/Link'
import { ElementType, forwardRef } from 'react'

import stylesBlock from 'utils/stylesBlock'

import styles from './link.module.scss'

export type IProps = LinkProps & {
  blank?: boolean
  touch?: boolean
  testId?: string
  component?: ElementType<any>
}

const b = stylesBlock(styles)

const Link: React.FC<IProps> = forwardRef<any, IProps>(({
  blank = false,
  touch = false,
  testId, 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <MuiLink
      ref={ref}
      target={blank ? '_blank' : undefined}
      rel={blank ? 'noopener noreferrer' : undefined}
      data-testid={testId}
      className={b('link', { touch }, className)}
      {...props}
    >
      { children }
    </MuiLink>
  )
})

export default Link
