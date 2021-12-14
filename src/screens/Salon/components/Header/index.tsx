import Text from 'components/Text'
import useCurrentSalon from 'hooks/useCurrentSalon'

import styles from './header.module.scss'

const Header: React.FC = () => {

  const { name } = useCurrentSalon()

  return (
    <Text 
      className={styles.item}
      variant='h1'
      itemProp='name'
    >
      { name }
    </Text>
  )
}

export default Header
