import React, { useCallback, useRef, useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Carousel from 'react-multi-carousel'
import isNumber from 'lodash/isNumber'

import BlackTheme from 'components/BlackTheme'
import MultiCarousel from 'components/MultiCarousel'
import IconButton from 'components/IconButton'
import Text from 'components/Text'
import Dialog from 'components/Dialog/Dialog'

import Photo from './components/Photo'
import ButtonGroup from './components/ButtonGroup'

import styles from './carouselDialog.module.scss'

interface IProps {
  initialSlide: number | null
  photos: IPhoto[]
  onClose: () => void
}

const responsive = {
  default: {
    breakpoint: { max: Number.MAX_VALUE, min: 0 },
    items: 1,
  },
}

const CarouselDialog: React.FC<IProps> = ({ initialSlide, photos, onClose }) => {

  const sliderRef = useRef<Carousel>(null)

  const [ index, setIndex ] = useState(1)

  const onSlideChange = useCallback((slideIndex: number) => {
    setIndex(slideIndex + 1)
  }, [])

  useEffect(() => {
    if (!isNumber(initialSlide)) { return }
    setTimeout(() => {
      sliderRef.current?.goToSlide(initialSlide, false)
      setIndex(initialSlide + 1)
    }, 50)
  }, [initialSlide])

  return (
    <Dialog
      open={isNumber(initialSlide)}
      fullScreen
    >
      <BlackTheme className={styles.wrapper}>
        <div className={styles.headerGroup}>
          <div className={styles.closeGroup}>
            <IconButton 
              size='small' 
              onClick={onClose}
            >
              <CloseIcon color='primary' />
            </IconButton>
            <Text className={styles.closeText}>
              Close
            </Text>
          </div>
          <Text className={styles.counter}>
            {` ${index} / ${photos.length}`}
          </Text>
          <div className={styles.item} />
        </div>
        <div className={styles.container}>
          <MultiCarousel
            arrows={false}
            renderButtonGroupOutside
            responsive={responsive}
            customButtonGroup={<ButtonGroup />}
            beforeChange={onSlideChange}
            forwardRef={sliderRef}
          >
            { photos.map((photo) => <Photo key={photo.id} src={photo.image.url} />) }
          </MultiCarousel>
        </div>
      </BlackTheme>
    </Dialog>
  )
}

export default CarouselDialog
