import React from 'react'
import stylesBlock from 'utils/stylesBlock'

import styles from './wrapper.module.scss'

const b = stylesBlock(styles)

const Wrapper: React.FC = ({ children }) => (
  <div className={b('wrapper')}>
    { children }
  </div>
)

export default Wrapper
