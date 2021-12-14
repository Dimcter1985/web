import Text from 'components/Text'

import styles from './chargeInfo.module.scss'

const ChargeInfo: React.FC = ({ children }) => {
  return (
    <Text className={styles.item}>
      { children }
    </Text>
  )
}

export default ChargeInfo
