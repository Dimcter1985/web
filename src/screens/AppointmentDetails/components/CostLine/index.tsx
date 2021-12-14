import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import DetailsText from '../DetailsText'
import styles from './CostLine.module.scss'

interface IProps {
  bold?: boolean;
  caption: string;
  cost: number;
}

const b = stylesBlock(styles)

const CostLine: React.FC<IProps> = ({ bold, caption, cost }) => (
  <div className={b('cost-line', { bold })}>
    <DetailsText className={b('text')}>{ caption }</DetailsText>
    <DetailsText className={b('text')}>{ `$${cost}` }</DetailsText>
  </div>
)

export default CostLine
