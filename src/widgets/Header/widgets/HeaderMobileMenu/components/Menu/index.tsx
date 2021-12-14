import React from 'react'

import stylesBlock from 'utils/stylesBlock'
import styles from './styles.module.scss'

interface IProps {
  visible: boolean
}

const b = stylesBlock(styles)

const Menu: React.FC<IProps> = ({ children, visible }) => (
  <div className={b('menu', { visible })}>
    {children}
  </div>
)

export default Menu