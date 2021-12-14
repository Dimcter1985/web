
import styles from './tabsGroup.module.scss'

const TabsGroup: React.FC = ({ children }) => {
  return (
    <div className={styles.item}>
      { children }
    </div>
  )
}

export default TabsGroup
