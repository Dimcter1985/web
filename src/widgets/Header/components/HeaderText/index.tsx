import React from 'react'
import block from 'utils/stylesBlock'
import Text, { IProps } from 'components/Text'

import styles from './headerText.module.scss'

const cls = block(styles)

const HeaderText: React.FC<IProps> = ({ children, className, ...props }) => (
  <Text className={cls('text', className)} {...props}>
    {children}
  </Text>
)

export default HeaderText
