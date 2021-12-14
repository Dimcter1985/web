import Button from 'components/Button'
import Text from 'components/Text'

import styles from './tabsMobile.module.scss'

interface IProps {
  onClick: () => void
}

const TabsMobileDateTime: React.FC<IProps> = ({ onClick }) => {
  return (
    <>
      <Text className={styles.activeText}>
        DATE & TIME
      </Text>
      <Button
        className={styles.button}
        variant='text'
        onClick={onClick}
      >
        CALENDAR
      </Button>
    </>
  )
}

export default TabsMobileDateTime
