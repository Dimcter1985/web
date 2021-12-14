import Rating from './components/Rating'
import Reviews from './components/Reviews'
import styles from './ratingGroup.module.scss'

const RatingGroup: React.FC = () => {
  return (
    <div className={styles.container}>
      <Rating />
      <Reviews />
    </div>
  )
}

export default RatingGroup
