import Text from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './title.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const Title: React.FC<IProps> = ({ className, children }) => (
  <Text 
    variant='h2' 
    className={b('title', null, className)}
  >
    { children }
  </Text>
)

export default Title
