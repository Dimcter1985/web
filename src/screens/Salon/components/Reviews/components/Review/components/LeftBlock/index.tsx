
import styles from './leftBlock.module.scss'

const LeftBlock: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

export default LeftBlock
