import RowContainer from '../RowContainer'
import styles from './headerGroup.module.scss'

const HeaderGroup: React.FC = ({ children }) => {
  return (
    <RowContainer className={styles.item}>
      { children }
    </RowContainer>
  )
}

export default HeaderGroup
