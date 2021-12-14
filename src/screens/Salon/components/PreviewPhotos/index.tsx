import React, { useMemo, memo } from 'react'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useVisibility from 'hooks/useVisibility'
import sortPhotos from 'utils/sortPhotos'

import MoreBtn from './components/MoreBtn'
import Photo from './components/Photo'
import PhotosDialog from './components/PhotosDialog'

import styles from './previewPhotos.module.scss'

const PreviewPhotos: React.FC = () => {
  const { photos } = useCurrentSalon()
  const { visible, show, hide } = useVisibility(false)

  const preparedPhotos = useMemo(() => {
    if (photos.length <= 3) {
      return sortPhotos(photos)
    }
    return sortPhotos(photos.slice(0, 3))
  }, [photos])

  if (!photos.length) { return null }

  const hasMore = photos.length >= 2

  return (
    <>
      <div className={styles.containerGrid}>
        { preparedPhotos.map((photo) => (
          <Photo key={photo.id} photo={photo} />
        ))}
        <MoreBtn visible={hasMore} onClick={show} />
      </div>
      <PhotosDialog 
        visible={visible}
        photos={photos}
        onClose={hide}
      />
    </>
  )
}

export default memo(PreviewPhotos)
