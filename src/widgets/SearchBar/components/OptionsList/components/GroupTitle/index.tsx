import Text from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './groupTitle.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const GroupTitle: React.FC<IProps> = ({ className, children }) => (
  <Text className={b('item', className)}>
    { children }
  </Text>
)

export default GroupTitle
