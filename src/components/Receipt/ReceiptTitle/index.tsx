import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './ReceiptTitle.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const ReceiptTitle: React.FC<IProps> = ({ className, children }) => (
  <Text className={b('title', className)}>{ children }</Text>
)

export default ReceiptTitle
