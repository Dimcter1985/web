import Text from 'components/Text'
import getWorkHours from 'utils/getWorkHours'
import stylesBlock from 'utils/stylesBlock'

import styles from './day.module.scss'

interface IProps {
  label: string
  day: IDayWorkHours
}

const b = stylesBlock(styles)

const Day: React.FC<IProps> = ({ label, day }) => {

  const { work } = day

  return (
    <div className={styles.container}>
      <Text className={styles.label}>
        { label }
      </Text>
      <Text className={b('hours', { closed: work === 'no' })}>
        { getWorkHours(day) }
      </Text>
    </div>
  )
}

export default Day
