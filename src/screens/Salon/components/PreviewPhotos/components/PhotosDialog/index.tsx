import React, { useCallback, useState } from 'react'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

import IconButton from 'components/IconButton'
import Dialog from 'components/Dialog/Dialog'

import Photo from './components/Photo'
import CarouselDialog from './components/CarouselDialog'
import { ReactComponent as ArrowBackIcon } from './icons/arrowBack.svg'
import styles from './photosDialog.module.scss'

interface IProps {
  visible: boolean
  photos: IPhoto[]
  onClose: () => void
}

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction='up' ref={ref} {...props} />
})

const PhotosDialog: React.FC<IProps> = ({ 
  visible: open, 
  photos, 
  onClose,
}) => {

  const [ initialSlide, setInitialSlide ] = useState<number | null>(null)

  const onPhotoClick = useCallback((openIndex: number) => {
    setInitialSlide(openIndex)
  }, [])

  const onCarouselClose = () => setInitialSlide(null)

  return (
    <>
      <Dialog
        open={open}
        fullScreen
        TransitionComponent={Transition}
        transitionDuration={250}
        onClose={onClose}
      >
        <div className={styles.headerGroup}>
          <IconButton 
            className={styles.button}
            onClick={onClose}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className={styles.container}>
          <div className={styles.photosGroup}>
            { photos.map((photo, index) => (
              <Photo 
                key={photo.id} 
                photo={photo} 
                onClick={() => onPhotoClick(index)} 
              />
            ))}
          </div>
        </div>
      </Dialog>
      <CarouselDialog 
        initialSlide={initialSlide}
        photos={photos}
        onClose={onCarouselClose}
      />
    </>
  )
}

export default PhotosDialog
