import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Carousel from 'react-multi-carousel'
import moment, { Moment } from 'moment-timezone'
import times from 'lodash/times'

import MultiCarousel from 'components/MultiCarousel'

import DateItem from '../DateItem'
import styles from './daysCarousel.module.scss'

interface IProps {
  initialDate: Moment
  date: Moment
  setDate: (value: Moment) => void
}

const TOTAL_DAYS = 365
const TIMEOUT_DALY = 50

const DaysCarousel: React.FC<IProps> = ({ initialDate, date, setDate }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  
  const days = useMemo(() => (
    times(TOTAL_DAYS, (item) => {
      return moment(initialDate).add(item, 'day').startOf('day')
    })
  ), [initialDate])

  const initialSlide = useMemo(() => {
    return days.findIndex((record) => moment(record).isSame(date, 'day'))
  }, [days, date])

  const sliderRef = useRef<Carousel>(null)

  const onSlideChange = useCallback((slideIndex: number) => {
    setDate(moment(days[slideIndex]))
    setActiveItem(slideIndex)
  }, [days])

  const onSlideItemClick = useCallback((slideIndex: number) => {
    setTimeout(() => sliderRef.current?.goToSlide(slideIndex), TIMEOUT_DALY)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      sliderRef.current?.goToSlide(initialSlide, true)
      setActiveItem(initialSlide)
    }, TIMEOUT_DALY)
  }, [initialSlide])

  return (
    <div className={styles.wrapper}>
      <MultiCarousel
        className={styles.carousel}
        arrows={false}
        beforeChange={onSlideChange}
        forwardRef={sliderRef}
      >
        {days.map((day, index) => (
          <DateItem 
            key={index.toString()}
            isActive={index === activeItem}
            onClick={() => onSlideItemClick(index)}
          >
            { index === 0 ? 'Today' : moment(day).format('MMM. DD') }
          </DateItem>
        ))}
      </MultiCarousel>
    </div>
  )
}

export default DaysCarousel
