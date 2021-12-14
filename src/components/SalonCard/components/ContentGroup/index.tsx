
import styles from './contentGroup.module.scss'

const ContentGroup: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default ContentGroup
