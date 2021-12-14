
import styles from './bottomGroup.module.scss'

const BottomGroup: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default BottomGroup
