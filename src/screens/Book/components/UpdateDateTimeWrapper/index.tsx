
import styles from './updateDateTimeWrapper.module.scss'

const UpdateDateTimeWrapper: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default UpdateDateTimeWrapper
