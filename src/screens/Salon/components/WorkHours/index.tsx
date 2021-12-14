import useCurrentSalon from 'hooks/useCurrentSalon'

import Caption from '../Caption'
import Day from './components/Day'

import styles from './workHours.module.scss'

const WorkHours: React.FC = () => {

  const { workHours } = useCurrentSalon()

  const { mon, tue, wed, thu, fri, sat, sun } = workHours

  return (
    <div className={styles.container}>
      <Caption>Hours of Operation</Caption>
      <Day label='MON' day={mon} />
      <Day label='TUES' day={tue} />
      <Day label='WED' day={wed} />
      <Day label='THURS' day={thu} />
      <Day label='FRI' day={fri} />
      <Day label='SAT' day={sat} />
      <Day label='SUN' day={sun} />
    </div>
  )
}

export default WorkHours
