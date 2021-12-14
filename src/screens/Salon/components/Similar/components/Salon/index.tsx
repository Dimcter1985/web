import Text from 'components/Text'
import Rating from 'components/Rating'
import Link from 'components/Link'
import Row from 'components/Row'
import salonImage from 'core/resources/salon.jpg'
import buildSalonLink from 'utils/buildSalonLink'

import styles from './salon.module.scss'

interface IProps {
  salon: IListSalon
}

const Salon: React.FC<IProps> = ({ salon }) => {

  const {
    name,
    overallRating,
    image,
    slug,
  } = salon

  const link = buildSalonLink(slug)

  return (
    <Link 
      href={link}
      blank
    >
      <img 
        src={image ? image.thumbUrl : salonImage} 
        alt={name}
        className={styles.image}
      />
      <Row>
        <Text className={styles.name}>
          { name }
        </Text>
        <Rating 
          value={overallRating} 
          readOnly
        />
      </Row>
    </Link>
  )
}

export default Salon
