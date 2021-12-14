import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './DetailsText.module.scss'

interface IProps {
  className?:string;
  position?: 'left' | 'center' | 'right';
}

const b = stylesBlock(styles)

const DetailsText: React.FC<IProps> = ({ className, position = 'left', children }) => (
  <Text className={b('text', { position }, className)} variant='h6'>{ children }</Text>
)

export default DetailsText
