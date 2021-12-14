import React, { useCallback } from 'react'
import moment from 'moment'
import pluralize from 'pluralize'
import stylesBlock from 'utils/stylesBlock'
import useSearch from 'hooks/useSearch'
import { IExtendedTimeSlot } from 'types/search'
import PureButton from 'components/PureButton'
import Text from 'components/Text'
import Rating from 'components/Rating'
import Divider from 'components/Divider'
import HiddenOn from 'components/HiddenOn'
import useMediaQueries from 'hooks/useMediaQueries'
import Image from './components/Image'
import TimeSlot from './components/TimeSlot'
import styles from './SearchSalonCard.module.scss'

interface IProps {
  salon: IListSalon
  services?: IService[]
  slots?: IExtendedTimeSlot[]
  onCardClick: () => void
  onTimeSlotClick?: (salon: IListSalon, services: IService[], startsAt: Date, technicianId: number) => void
}

const b = stylesBlock(styles)

const SearchSalonCard: React.FC<IProps> = ({ salon, services, slots, onCardClick, onTimeSlotClick }) => {
  const { isSmallScreen } = useMediaQueries()
  const { setHoverSalonId } = useSearch()
  const { id, image, name, averageRating, reviewsCount, address, city } = salon

  const date = moment(slots ? slots[0].date : undefined).tz(salon.timezone).format('MMM D')

  const onMouseEnter = useCallback(() => {
    setHoverSalonId(id)
  }, [id, setHoverSalonId])

  const onMouseLeave = useCallback(() => {
    setHoverSalonId(null)
  }, [])

  return (
    <>
      <div
        className={b('wrapper')}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Image
          src={image?.thumbUrl}
          alt={`${name} salon`}
          onClick={onCardClick}
        />
        <div className={b('info')}>
          <PureButton className={b('about-salon')} onClick={onCardClick}>
            <Text className={b('name')}>{ name }</Text>
            <div className={b('rating-wrapper')}>
              <Rating
                className={b('rating')}
                size={isSmallScreen ? 'medium' : 'large'}
                value={averageRating}
                readOnly
              />
              <Text className={b('reviews')}>
                { pluralize('review', reviewsCount, true) }
              </Text>
            </div>
            <Text color='textSecondary'>
              { `${address}${isSmallScreen ? `, ${city}` : ''}` }
            </Text>
            <HiddenOn tablet mobile>
              <Text color='textSecondary'>
                { city }
              </Text>
            </HiddenOn>
          </PureButton>
          { slots &&
            <div className={b('slots')}>
              <Text className={b('day')}>{ `Today, ${date}` }</Text>
              <div className={b('times')}>
                { slots.map((slot) => (
                  <TimeSlot
                    slot={slot}
                    onClick={() => onTimeSlotClick!(salon, services!, slot.date, slot.technicianId)} />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
      <HiddenOn tablet mobile>
        <Divider />
      </HiddenOn>
    </>
  )
}

export default SearchSalonCard
