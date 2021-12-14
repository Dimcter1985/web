import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import HiddenOn from 'components/HiddenOn'
import Text from 'components/Text'
import styles from './Section.module.scss'

interface IProps {
  className?: string;
  title: string;
}

const b = stylesBlock(styles)

const Section: React.FC<IProps> = ({ className, title, children }) => (
  <div className={b('section', className)}>
    <HiddenOn tablet mobile>
      <Text className={b('title')}>{ title }</Text>
    </HiddenOn>
    { children }
  </div>
)

export default Section
