import React from 'react'
import Text from 'components/Text'
import stylesBlock from 'utils/stylesBlock'
import styles from './ReceiptTextAccent.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const ReceiptTextAccent: React.FC<IProps> = ({ className, children }) => (
  <Text className={b('item', className)}>
    { children }
  </Text>
)

export default ReceiptTextAccent
