import Text, { IProps } from 'components/Text'
import stylesBlock from 'utils/stylesBlock'

import styles from './subheading.module.scss'

const b = stylesBlock(styles)

const Subheading: React.FC<IProps> = ({ className, children }) => {
  return (
    <Text variant='h2' className={b('text', className)}>
      { children }
    </Text>
  )
}

export default Subheading
