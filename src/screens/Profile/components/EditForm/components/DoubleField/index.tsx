import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import styles from './DoubleField.module.scss'

const b = stylesBlock(styles)

const DoubleField: React.FC = ({ children }) => (
  <div className={b('wrapper')}>
    { children }
  </div>
)

export default DoubleField
