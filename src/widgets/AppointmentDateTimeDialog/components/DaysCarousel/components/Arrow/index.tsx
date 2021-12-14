import stylesBlock from 'utils/stylesBlock'

import styles from './arrow.module.scss'

interface IProps {
  variant: 'right' | 'left'
}

const b = stylesBlock(styles)

const Arrow: React.FC<IProps> = ({ variant }) => {
  return (
    <div 
      className={b('item', { variant })}
    />
  )
}

export default Arrow
