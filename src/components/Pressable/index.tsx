import React from 'react'

import block from 'utils/stylesBlock'
import styles from './styles.module.scss'

const b = block(styles)

const Pressable: React.FC<PressableProps> = ({ children, className, onClick, onKeyPress, ...props }) => (
  <span
    role='button'
    tabIndex={0}
    onKeyPress={onKeyPress}
    onClick={onClick}
    className={b('pressable', {}, className)}
    {...props}
  >
    {children}
  </span>
)

export default Pressable