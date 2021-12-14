import React, { useCallback } from 'react'

import Link from 'components/Link'

import styles from './styles.module.scss'

interface IProps {
  href?: string
  onClick?: (href: string) => void
}

const MenuItem: React.FC<IProps> = ({ href = '#', onClick, children }) => {
  const onItemClick = useCallback((event) => {
    if (onClick) {
      event.preventDefault()
      onClick(href)
    }
  }, [href, onClick])

  return (
    <Link 
      className={styles.menuItem} 
      href={href} 
      onClick={onItemClick} 
    >
      { children }
    </Link>
  )
}

export default MenuItem