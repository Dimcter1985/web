
import styles from './itemWrapper.module.scss'

const ItemWrapper: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default ItemWrapper
