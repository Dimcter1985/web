import React from 'react'
import times from 'lodash/times'
import stylesBlock from 'utils/stylesBlock'
import ArcOrnament from 'components/Svg/ArcOrnament'
import styles from './PatternLine.module.scss'

interface IProps {
  inverted?: boolean;
}

const b = stylesBlock(styles)

const PatternLine: React.FC<IProps> = ({ inverted }) => (
  <div className={b('line', { inverted })}>
    { times(6, (index) => (
      <ArcOrnament
        key={index}
        width='100%'
        height='100%'
        className={b('item')}
      />
    ))}
  </div>
)

export default PatternLine
