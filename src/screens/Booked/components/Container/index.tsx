
import styles from './container.module.scss'

const Container: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default Container
