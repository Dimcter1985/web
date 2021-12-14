import pluralize from 'pluralize'

import Text from 'components/Text'

import styles from './reviews.module.scss'

interface IProps {
  reviewsCount: ISalon['reviewsCount']
}

const Reviews: React.FC<IProps> = ({ reviewsCount }) => {
  return (
    <Text className={styles.item}>
      { pluralize('Review', reviewsCount, true) }
    </Text>
  )
}

export default Reviews
