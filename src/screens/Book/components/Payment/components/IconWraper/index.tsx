
import styles from './iconWrapper.module.scss'

const IconWrapper: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default IconWrapper
