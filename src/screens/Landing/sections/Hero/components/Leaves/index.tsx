import Leave from 'components/Svg/Leave'
import React from 'react'

import block from 'utils/stylesBlock'
import styles from './styles.module.scss'

const b = block(styles)

interface IProps {
  side: 'left' | 'right'
  className?: string
}

const Leaves: React.FC<IProps> = ({ side, className }) => (
  <div className={b('leaves', { side }, className)}>
    <Leave className={b('leave', { position: `${side}_top` })} />
    <Leave className={b('leave', { position: `${side}_bottom` })} />
  </div>
)

export default Leaves