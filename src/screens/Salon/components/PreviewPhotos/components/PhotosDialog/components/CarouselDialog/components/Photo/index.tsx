import styles from './photo.module.scss'

interface IProps {
  src: string
}

const Photo: React.FC<IProps> = ({ src }) => {
  return (
    <img
      className={styles.image}
      src={src}
      alt=''
    />
  )
}

export default Photo
