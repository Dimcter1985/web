import Text from 'components/Text'

import styles from './infoName.module.scss'

const InfoName: React.FC = ({ children }) => {
  return (
    <Text className={styles.text}>
      { children }
    </Text>
  )
}

export default InfoName
