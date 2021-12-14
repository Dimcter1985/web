import React, { useCallback } from 'react'

import ArrowRight from 'components/Svg/ArrowRight'
import Link from 'components/Link'
import Text  from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './styles.module.scss'

const b = stylesBlock(styles)

interface IProps {
  href: string
  className?: string
  onClick?: (href: string) => void
}

const MenuItem: React.FC<IProps> = ({ className, children, href, onClick, ...props }) => {
  const onItemClick = useCallback((event) => {
    if (onClick) {
      event.preventDefault()
      onClick(href)
    }
  }, [href, onClick])

  return (
    <Link 
      className={b('menuItem', className)} 
      href={href} 
      onClick={onItemClick} 
      {...props}
    >
      <Text className={styles.menuItemText}>
        { children }
      </Text>
      <ArrowRight />
    </Link>
  )
}

export default MenuItem