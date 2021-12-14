import styles from './image.module.scss'

interface IProps {
  src: string
}

const Image: React.FC<IProps> = ({ src }) => {
  return (
    <img src={src} alt='' className={styles.item} />
  )
}

export default Image
