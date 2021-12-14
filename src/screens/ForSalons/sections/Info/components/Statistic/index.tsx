import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './Statistic.module.scss'

interface IProps {
  title: string;
  text: string;
}

const b = stylesBlock(styles)

const Statistic: React.FC<IProps> = ({ title, text }) => (
  <div className={b('wrapper')}>
    <Text className={b('title')}>{ title }</Text>
    <Text className={b('text')} variant='body1'>{ text }</Text>
  </div>
)

export default Statistic
