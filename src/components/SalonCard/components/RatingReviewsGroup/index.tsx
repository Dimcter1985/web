import styles from './ratingReviewsGroup.module.scss'

const RatingReviewsGroup: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default RatingReviewsGroup
