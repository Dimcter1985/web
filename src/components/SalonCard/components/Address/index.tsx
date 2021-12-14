
import Text from 'components/Text'

import styles from './address.module.scss'

const Address: React.FC = ({ children }) => {
  return (
    <Text className={styles.item}>
      { children }
    </Text>
  )
}

export default Address
