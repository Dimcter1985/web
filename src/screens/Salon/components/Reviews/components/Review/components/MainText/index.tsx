import Text from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './mainText.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const MainText: React.FC<IProps> = ({ className, children }) => {
  return (
    <Text className={b('item', null, className)}>
      { children }
    </Text>
  )
}

export default MainText
