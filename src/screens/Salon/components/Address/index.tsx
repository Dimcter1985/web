import useCurrentSalon from 'hooks/useCurrentSalon'
import Text from 'components/Text'
import getSalonAddressInfo from 'utils/getSalonAddressInfo'

import styles from './address.module.scss'

const Address: React.FC = () => {

  const salon = useCurrentSalon()

  return (
    <Text className={styles.item}>
      { getSalonAddressInfo(salon) }
    </Text>
  )
}

export default Address
