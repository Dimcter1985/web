import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import RouterLink from 'components/RouterLink'
import Text from 'components/Text'
import styles from './Item.module.scss'

interface IProps {
  active: boolean;
  href: string;
}

const b = stylesBlock(styles)

const Item: React.FC<IProps> = ({ active, href, children }) => (
  <RouterLink className={b('item')} href={href}>
    <Text className={b('text', { active })}>{ children }</Text>
  </RouterLink>
)

export default Item
