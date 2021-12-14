import { useCallback } from 'react'
import pluralize from 'pluralize'

import fetchReviews from 'core/api/review/fetchReviews'
import useList from 'core/hooks/useList'
import Link from 'components/Link'
import useCurrentSalon from 'hooks/useCurrentSalon'
import stylesBlock from 'utils/stylesBlock'
import { SortDirections } from 'core/consts/sorting'
import { REVIEW_FIELDS } from 'consts/queryFields'
import Star from 'components/Svg/Star'
import Subheading from '../Subheading'
import Review from './components/Review'

import styles from './reviews.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)
const PER_PAGE = 3

const sortByDate = (reviews: IReview[]) => (
  reviews.sort((x, y) => new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime())
)

const Reviews: React.FC<IProps> = ({ className }) => {

  const { id: salonId, averageRating, reviewsCount, reviews } = useCurrentSalon()

  const { data, noMore, loadMore, start } = useList(fetchReviews, {
    infinity: true,
    initialData: { data: sortByDate(reviews), total: reviewsCount },
    filters: { salonIdEq: salonId },
    sort: { order: SortDirections.DESC, sortBy: 'updatedAt' },
    perPage: PER_PAGE,
    queryFields: REVIEW_FIELDS,
  })

  if (!reviewsCount) { return null }
  
  const heading = `${averageRating?.toFixed(1) || 0} - ${pluralize('review', reviewsCount, true)}`
  const hasMoreBtn = reviewsCount > 3

  const moreLessClick = useCallback(() => {
    if (!noMore) { 
      loadMore()
    } else {
      start()
    }
  } ,[loadMore, noMore, start])

  return (
    <div className={b('container', className)}>
      <Subheading className={styles.subheading}>
        <div className={styles.starWrapper}>
          <Star opacity='1' />
        </div>
        { heading }
      </Subheading>
      { data.map((review) => <Review key={review.id} review={review} />) }
      <div className={b('moreBtnWrapper', { visible: hasMoreBtn })}>
        <Link
          className={b('showMoreBtn')}
          onClick={moreLessClick}
        >
          { `Show ${ !noMore ? 'more' : 'less'}` }
        </Link>
      </div>
    </div>
  )
}

export default Reviews
