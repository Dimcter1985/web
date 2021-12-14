import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import styles from './ReceiptContentGroup.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const ReceiptContentGroup: React.FC<IProps> = ({ className, children }) => (
  <div className={b('item', className)}>
    { children }
  </div>
)

export default ReceiptContentGroup
