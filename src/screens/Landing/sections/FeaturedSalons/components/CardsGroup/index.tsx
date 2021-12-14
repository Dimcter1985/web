
import styles from './cardsGroup.module.scss'

const CardsGroup: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default CardsGroup
