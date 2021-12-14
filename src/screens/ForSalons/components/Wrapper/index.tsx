import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import styles from './Wrapper.module.scss'

const b = stylesBlock(styles)

const Wrapper: React.FC = ({ children }) => (
  <div className={b('root')}>
    { children }
  </div>
)

export default Wrapper
