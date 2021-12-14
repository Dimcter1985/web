import PureButton from 'components/PureButton'

import styles from './photo.module.scss'

interface IProps { 
  photo: IPhoto 
  onClick: () => void
}

const Photo: React.FC<IProps> = ({ photo, onClick }) => {

  const { image } = photo

  return (
    <PureButton 
      className={styles.wrapper}
      onClick={onClick}
    >
      <img 
        className={styles.photo}
        src={image.url}
        alt=''
      />
    </PureButton>
  )
}

export default Photo
