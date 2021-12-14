import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './ReceiptCaption.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const ReceiptCaption: React.FC<IProps> = ({ className, children }) => (
  <Text className={b('item', className)}>
    { children }
  </Text>
)

export default ReceiptCaption
