import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import styles from './ReceiptDivider.module.scss'

const b = stylesBlock(styles)

const ReceiptDivider: React.FC = () => (
  <hr className={b('separator')} />
)

export default ReceiptDivider
