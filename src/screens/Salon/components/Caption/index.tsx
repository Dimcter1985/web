import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'

import styles from './caption.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const Caption: React.FC<IProps> = ({ className, children }) => {
  return (
    <Text className={b('text', className)}>
      { children }
    </Text>
  )
}

export default Caption
