import RatingBase from 'components/Rating'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useMediaQueries from 'hooks/useMediaQueries'

import styles from './rating.module.scss'

const Rating: React.FC = () => {
  const { isSmallScreen } = useMediaQueries()
  const { 
    overallRating, 
    reviewsCount,
  } = useCurrentSalon()

  const rating = overallRating ? overallRating.toFixed() : '0'
  const worstRating = overallRating ? Math.floor(overallRating).toString() : '0'

  return (
    <div 
      className={styles.container}
      itemProp='aggregateRating' 
      itemScope 
      itemType='http://schema.org/AggregateRating'
    >
      <meta content={reviewsCount.toString()} itemProp='ratingCount' />
      <meta content={rating} itemProp='ratingValue' />
      <meta content='5' itemProp='bestRating' />
      <meta content={worstRating} itemProp='worstRating' />
      <RatingBase 
        value={overallRating} 
        readOnly
        size={isSmallScreen ? 'medium' : 'large'}
      />
    </div>
  )
}

export default Rating
