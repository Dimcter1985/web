import useCurrentSalon from 'hooks/useCurrentSalon'

import Caption from '../Caption'
import { ReactComponent as Icon } from './icons/icon.svg'

import styles from './specialize.module.scss'

const Speciality: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} />
      { children }
    </div>
  )
}

const Specialize: React.FC = () => {

  const { speciality } = useCurrentSalon()

  if (!speciality) {
    return null
  }

  const items = speciality.split(',')

  return (
    <>
      <Caption>We Specialize In:</Caption>
      <div className={styles.specialsGroup}>
        { items.map((item) => (
          <Speciality key={item}>
            { item }
          </Speciality>
        )) }
      </div>
    </>
  )
}

export default Specialize
