import RatingBase from 'components/Rating'

import styles from './rating.module.scss'

interface IProps {
  overallRating?: number | null
}

const Rating: React.FC<IProps> = ({ overallRating = 1 }) => {
  return (
    <div className={styles.container}>
      <RatingBase 
        value={overallRating} 
        readOnly 
        size='small'
        classes={{ icon: styles.ratingIcon }}
      />
    </div>
  )
}

export default Rating
