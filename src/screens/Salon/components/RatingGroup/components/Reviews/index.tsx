import pluralize from 'pluralize'

import Text from 'components/Text'
import useCurrentSalon from 'hooks/useCurrentSalon'

import styles from './reviews.module.scss'

const Reviews: React.FC = () => {

  const { reviewsCount } = useCurrentSalon()

  return (
    <Text className={styles.item}>
      { pluralize('Review', reviewsCount, true) }
    </Text>
  )
}

export default Reviews
