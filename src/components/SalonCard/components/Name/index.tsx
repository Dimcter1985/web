import Text, { IProps } from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './name.module.scss'

const b = stylesBlock(styles)

const Name: React.FC<IProps> = ({ className, children }) => {
  return (
    <Text className={b('item', className)}>
      { children }
    </Text>
  )
}

export default Name
