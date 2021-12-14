import pluralize from 'pluralize'

import Text from 'components/Text'
import Rating from 'components/Rating'
import Divider from 'components/Divider'
import formatDate from 'core/utils/dateTime/formatDate'
import { FULL_DATE_FORMAT } from 'core/consts/dateTime'
import stylesBlock from 'utils/stylesBlock'

import useMediaQueries from 'hooks/useMediaQueries'
import LeftBlock from './components/LeftBlock'
import InfoRow from './components/InfoRow'
import InfoName from './components/InfoName'
import Image from './components/Image'
import Avatar from './components/Avatar'
import MainText from './components/MainText'

import styles from './review.module.scss'

interface IProps {
  review: IReview
}

const b = stylesBlock(styles)

const Review: React.FC<IProps> = ({ review }) => {
  const { isSmallScreen } = useMediaQueries()

  const {
    anonymous,
    comment,
    reviewerName,
    overallRating,
    customer,
    serviceNames,
    updatedAt,
    appointment,
    photos,
  } = review

  const servicesCount = serviceNames.length
  const hasImages = !!photos.length

  return (
    <div className={styles.container}>
      <div className={styles.topGroup}>
        <LeftBlock>
          <Avatar src={anonymous ? undefined : customer?.avatar} name={reviewerName} />
        </LeftBlock>
        <div>
          <Text className={styles.name}>
            { anonymous ? 'Anonymous' : reviewerName }
          </Text>
          <Rating 
            readOnly 
            value={overallRating}
            className={styles.rating}
            size={isSmallScreen ? 'medium' : 'large'}
          />
          <Text className={styles.date}>
            { formatDate(updatedAt, FULL_DATE_FORMAT) }
          </Text>
        </div>
      </div>
      <div>
        <InfoRow hide={!serviceNames.length}>
          <LeftBlock>
            <InfoName>{ pluralize('Service', servicesCount) }</InfoName>
          </LeftBlock>
          <MainText>
            { serviceNames.map((record) => (
              <span 
                key={record} 
                className={styles.comma}
              >
                { record }
              </span>
            ))}
          </MainText>
        </InfoRow>
        { appointment && (
          <InfoRow>
            <LeftBlock>
              <InfoName>Date</InfoName>
            </LeftBlock>
            <MainText>{ formatDate(appointment.startsAt, FULL_DATE_FORMAT) }</MainText>
          </InfoRow>
        )}
        { comment && (
          <InfoRow>
            <LeftBlock>
              <InfoName>Comments</InfoName>
            </LeftBlock>
            <MainText className={b('comment')}>{ comment }</MainText>
          </InfoRow>
        )}
      </div>
      <div className={b('imagesGroup', { hasImages })}>
        { photos.map((photo) => (
          <Image key={photo.id} src={photo.image.thumbUrl} />
        ))}
      </div>
      <Divider className={styles.divider} />
    </div>
  )
}

export default Review
