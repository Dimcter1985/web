import Text from 'components/Text'
import styles from './heading.module.scss'

const Heading: React.FC = ({ children }) => {
  return (
    <Text 
      className={styles.item} 
      variant='h1'
    >
      { children }
    </Text>
  )
}

export default Heading
