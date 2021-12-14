import Text from 'components/Text'
import styles from './listText.module.scss'

const ListText: React.FC = ({ children }) => {
  return (
    <Text className={styles.item}>
      { children }
    </Text>
  )
}

export default ListText
