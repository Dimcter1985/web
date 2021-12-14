
import styles from './wrapper.module.scss'

const Wrapper: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default Wrapper
