import Text from 'components/Text'

import styles from './groupCaption.module.scss'

const GroupCaption: React.FC = ({ children }) => {
  return (
    <Text className={styles.item}>
      { children }
    </Text>
  )
}

export default GroupCaption
