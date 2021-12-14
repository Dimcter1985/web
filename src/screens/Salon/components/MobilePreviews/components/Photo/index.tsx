import PureButton from 'components/PureButton'

import styles from './photo.module.scss'

interface IProps {
  src: string
  onClick?: () => void
}

const Photo: React.FC<IProps> = ({ src, onClick }) => {
  return (
    <PureButton 
      className={styles.wrapper} 
      onClick={onClick}
    >
      <img
        className={styles.image}
        src={src}
        alt=''
      />
    </PureButton>
  )
}

export default Photo
