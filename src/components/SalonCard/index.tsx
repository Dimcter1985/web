import Rating from './components/Rating'
import RatingReviewsGroup from './components/RatingReviewsGroup'
import Reviews from './components/Reviews'
import Address from './components/Address'
import Name from './components/Name'
import ContentGroup from './components/ContentGroup'
import Container from './components/Container'

interface IClasses {
  name?: string
}

interface IProps {
  className?: string
  salon: ISalon;
  classes?: IClasses
}

const SalonCard: React.FC<IProps> = ({ className, salon, classes = {} }) => {

  const { name } = classes

  const { 
    image, 
    name: salonName,
    overallRating,
    reviewsCount,
    address,
  } = salon

  return (
    <Container image={image} className={className}>
      <ContentGroup>
        <Name className={name}>
          { salonName }
        </Name>
        <Address>{ address }</Address>
        <RatingReviewsGroup>
          <Rating overallRating={overallRating} />
          <Reviews reviewsCount={reviewsCount} />
        </RatingReviewsGroup>
      </ContentGroup>
    </Container>
  )
}

export default SalonCard
