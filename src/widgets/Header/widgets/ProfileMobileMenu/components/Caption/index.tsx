import Text from 'components/Text'

import styles from './caption.module.scss'

const Caption: React.FC = ({ children }) => {
  return (
    <Text className={styles.item}>
      { children }
    </Text>
  )
}

export default Caption
