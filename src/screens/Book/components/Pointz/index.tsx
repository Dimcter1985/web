import Text from 'components/Text'
import useReceipt from '../../hooks/useReceipt'
import styles from './pointz.module.scss'

const Pointz: React.FC = () => {
  const { pointz } = useReceipt()

  return (
    <Text className={styles.item}>
      {`You’ll earn ${pointz} pointZ with this appointment!`}
    </Text>
  )
}

export default Pointz
