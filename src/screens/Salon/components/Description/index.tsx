import Text from 'components/Text'
import useCurrentSalon from 'hooks/useCurrentSalon'

import Caption from '../Caption'

import styles from './description.module.scss'

const Description: React.FC = () => {

  const { description } = useCurrentSalon()

  if (!description) {
    return null
  }

  return (
    <div className={styles.item}>
      <Caption>Salon Description</Caption>
      <Text className={styles.text}>
        { description }
      </Text>
    </div>
  )
}

export default Description
