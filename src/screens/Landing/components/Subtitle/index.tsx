import React from 'react'

import Text, { IProps } from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './subtitle.module.scss'

const b = stylesBlock(styles)

const Subtitle: React.FC<IProps> = ({ 
  variant = 'h3', 
  className,
  children,
  ...props 
}) => (
  <Text 
    variant={variant} 
    className={b('subtitle', null, className)}
    {...props}
  >
    { children }
  </Text>
)

export default Subtitle
