
import React, { useCallback, useRef, useState } from 'react'
import Carousel from 'react-multi-carousel'

import BlackTheme from 'components/BlackTheme'
import MultiCarousel from 'components/MultiCarousel'
import IconButton from 'components/IconButton'
import Text from 'components/Text'
import RouterLink from 'components/RouterLink'
import useVisibility from 'hooks/useVisibility'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useRouter from 'hooks/useRouter'

import PhotosDialog from '../PreviewPhotos/components/PhotosDialog'
import Photo from './components/Photo'
import { ReactComponent as ArrowIcon } from './icons/arrow.svg'

import styles from './mobilePreviews.module.scss'

const responsive = {
  default: {
    breakpoint: { max: Number.MAX_VALUE, min: 0 },
    items: 1,
  },
}

const MobilePreviews: React.FC = () => {

  const { photos } = useCurrentSalon()
  const { visible, show, hide } = useVisibility()
  const { back } = useRouter()

  const sliderRef = useRef<Carousel>(null)

  const [ index, setIndex ] = useState(1)

  const onSlideChange = useCallback((slideIndex: number) => {
    setIndex(slideIndex + 1)
  }, [])

  return (
    <>
      <BlackTheme className={styles.container}>
        <RouterLink 
          href='/search' 
          className={styles.backButton}
        >
          <IconButton 
            size='small'
            onClick={back}
          >
            <ArrowIcon />
          </IconButton>
        </RouterLink>
        <MultiCarousel
          arrows={false}
          renderButtonGroupOutside
          responsive={responsive}
          beforeChange={onSlideChange}
          forwardRef={sliderRef}
        >
          { photos.map((photo) => <Photo key={photo.id} src={photo.image.url} onClick={show} />) }
        </MultiCarousel>
        <Text className={styles.counter}>
          {` ${index} / ${photos.length}`}
        </Text>
      </BlackTheme>
      <PhotosDialog visible={visible} photos={photos} onClose={hide} />
    </>
  )
}

export default MobilePreviews
