import React from 'react'

import styles from './nav.module.scss'

const HeaderNav: React.FC = ({ children }) => (
  <nav className={styles.navigation}>
    {children}
  </nav>
)

export default HeaderNav
