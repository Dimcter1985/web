import { useEffect } from 'react'
import moment, { Moment } from 'moment-timezone'
import stylesBlock from 'utils/stylesBlock'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useVisibility from 'hooks/useVisibility'
import useMediaQueries from 'hooks/useMediaQueries'

import Button from 'components/Button'
import Text from 'components/Text'
import PureButton from 'components/PureButton'
import useTimeSlots from 'core/hooks/useTimeSlots'
import minutesToDate from 'core/utils/dateTime/minutesToDate'
import { TIME_FORMAT } from 'core/consts/dateTime'
import useCart from 'hooks/useCart'

import SlotsLoader from '../SlotsLoader'
import styles from './timeSlots.module.scss'

interface IProps {
  date: Moment
  timeSlot: IAvailableTimeSlot | null
  setTimeSlot: (slot: IAvailableTimeSlot | null) => void
}

const b = stylesBlock(styles)

const TimeSlots: React.FC<IProps> = ({ date, timeSlot, setTimeSlot }) => {
  const { appointment } = useCart()
  const { items } = useCart()
  const salon = useCurrentSalon()
  const { visible: visibleAllSlots, show: showAllSlots } = useVisibility(false)
  const { isSmallScreen } = useMediaQueries()

  const { 
    availableTimeSlots,
    slotsLoading,
    fetchSlots,
  } = useTimeSlots({
    salonId: salon.id,
    timezone: salon.timezone,
    date: moment(date).tz(salon.timezone).toDate(),
    services: items,
    appointment: appointment || null,
  })

  const isNoItems = !availableTimeSlots.length

  useEffect(() => {
    fetchSlots()
  }, [date])

  return (
    <div className={styles.container}>
      { !slotsLoading && isNoItems && <Text align='center'>No available slots found</Text> }
      <div className={styles.slotsGrid}>
        { slotsLoading && <SlotsLoader /> }
        { availableTimeSlots.map((availableTimeSlot, index) => (
          <Button
            key={availableTimeSlot.slot}
            className={b('dateBtn', { notShow: index > 15 && !visibleAllSlots && !isSmallScreen })}
            variant={timeSlot?.slot === availableTimeSlot.slot ? 'contained' : 'outlined'}
            onClick={() => setTimeSlot(availableTimeSlot)}
          >
            { minutesToDate(availableTimeSlot.slot).format(TIME_FORMAT) }
          </Button>
        ))}
      </div>
      { !visibleAllSlots &&
        <PureButton className={styles.showAllButton} onClick={() => showAllSlots()}>Show all time</PureButton>
      }
    </div>
  )
}

export default TimeSlots
