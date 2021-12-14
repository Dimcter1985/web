import React from 'react'

import Text, { IProps as ITextProps }  from 'components/Text'
import stylesBlock from 'utils/stylesBlock'
import styles from './styles.module.scss'

const b = stylesBlock(styles)

interface IProps extends Omit<ITextProps, 'variant'> {
  variant?: 'agency' | 'link' | 'head'
}

const FooterText: React.FC<IProps> = ({ children, variant, className, ...props }) => (
  <Text className={b('text', { variant }, className)} {...props}>
    {children}
  </Text>
)

export default FooterText
