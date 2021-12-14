import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './Section.module.scss'

interface IProps {
  className?: string;
  title: string;
}

const b = stylesBlock(styles)

const Section: React.FC<IProps> = ({ className, title, children }) => (
  <div className={b('section', className)}>
    <Text className={b('title')}>{ title }</Text>
    { children }
  </div>
)

export default Section
