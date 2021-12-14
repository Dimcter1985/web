import React from 'react'

import block from 'utils/stylesBlock'
import styles from './pure_button.module.scss'

const b = block(styles)

/* eslint-disable react/button-has-type */
const PureButton: React.FC<ButtonProps> = ({ children, className, type='button', ...props }) => (
  <button className={b('root', {}, className)} type={type || 'button'} {...props}>
    {children}
  </button>
)
/* eslint-enable react/button-has-type */

export default PureButton