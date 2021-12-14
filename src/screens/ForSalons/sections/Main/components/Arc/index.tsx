import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import ArcOrnament from 'components/Svg/ArcOrnament'
import styles from './Arc.module.scss'

interface IProps {
  side: 'left' | 'right';
}

const b = stylesBlock(styles)

const Arc: React.FC<IProps> = ({ side }) => (
  <div className={b('arc', { side })}>
    <ArcOrnament className={b('item')} />
    <ArcOrnament className={b('item')} />
  </div>
)

export default Arc
