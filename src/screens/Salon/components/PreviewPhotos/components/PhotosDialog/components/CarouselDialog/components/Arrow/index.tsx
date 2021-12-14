import IconButton from 'components/IconButton'
import stylesBlock from 'utils/stylesBlock'

import { ReactComponent as ArrowIcon } from './icons/arrow_icon.svg'
import styles from './arrow.module.scss'

interface IProps {
  hide: boolean
  side: 'right' | 'left'
  onClick?: () => void
}

const b = stylesBlock(styles)

const Arrow: React.FC<IProps> = ({ hide, side, onClick }) => {

  return (
    <IconButton 
      className={b('item', { side, hide })}
      onClick={onClick}
    >
      <ArrowIcon />
    </IconButton>
  )
}

export default Arrow
