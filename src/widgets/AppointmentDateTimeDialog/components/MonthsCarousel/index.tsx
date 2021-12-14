import React, { useCallback, useEffect, useRef, useMemo } from 'react'
import moment, { Moment } from 'moment-timezone'
import Carousel from 'react-multi-carousel'
import MultiCarousel from 'components/MultiCarousel'

import DateItem from '../DateItem'
import styles from './monthsCarousel.module.scss'

interface IProps {
  initialDate: Moment
  date: Moment
  setDate: (value: Moment) => void
}

const YEARS = 1
const MONTHS = 12
const TOTAL_MONTHS = YEARS * MONTHS - 1
const TIMEOUT_DALY = 50

const MonthsCarousel: React.FC<IProps> = ({ initialDate, date, setDate }) => {
  const nextMonths = useMemo(() => (
    Array.from(Array(TOTAL_MONTHS).keys()).map((item) => {
      return moment(initialDate).add(item + 1, 'M').startOf('M')
    })
  ), [initialDate])

  const months = useMemo(() => ([ initialDate, ...nextMonths ]), [initialDate ,nextMonths])
  
  const initialSlide = useMemo(() => (
    months.findIndex((record) => moment(record).isSame(date, 'M'))
  ), [months])

  const sliderRef = useRef<Carousel>(null)

  const onSlideChange = useCallback((slideIndex: number) => {
    setDate(moment(months[slideIndex]))
  }, [months])

  const onSlideItemCLick = useCallback((slideIndex: number) => {
    setTimeout(() => sliderRef.current?.goToSlide(slideIndex), TIMEOUT_DALY)
  }, [])

  useEffect(() => {
    setTimeout(() => sliderRef.current?.goToSlide(initialSlide, true), TIMEOUT_DALY)
  }, [])

  return (
    <div className={styles.wrapper}>
      <MultiCarousel
        className={styles.carousel}
        arrows={false}
        beforeChange={onSlideChange}
        forwardRef={sliderRef}
      >
        {months.map((month, index) => (
          <DateItem 
            key={index.toString()}
            onClick={() => onSlideItemCLick(index)}
          >
            { moment(month).format('MMM') }
          </DateItem>
        ))}
      </MultiCarousel>
    </div>
  )
}

export default MonthsCarousel
