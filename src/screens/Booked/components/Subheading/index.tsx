import Text from 'components/Text'
import styles from './subheading.module.scss'

const Subheading: React.FC = ({ children }) => {
  return (
    <Text className={styles.item}>
      { children }
    </Text>
  )
}

export default Subheading
