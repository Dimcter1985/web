import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'

import styles from './dateItem.module.scss'

interface IProps {
  onClick?: () => void
  isActive?: boolean
}

const b = stylesBlock(styles)

const DateItem: React.FC<IProps> = ({ onClick, isActive, children }) => {
  return (
    <Text 
      className={b('item', { isActive })}
      onClick={onClick}
    >
      { children }
    </Text>
  )
}

export default DateItem
