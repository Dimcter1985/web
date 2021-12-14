import SalonCard from 'components/SalonCard'
import Button from 'components/Button'
import RouterLink from 'components/RouterLink'
import buildSalonLink from 'utils/buildSalonLink'

import styles from './salonCardLink.module.scss'

interface IProps {
  salon: ISalon
}

const SalonCardLink: React.FC<IProps> = ({ salon }) => {

  const { slug } = salon

  return (
    <div className={styles.container}>
      <SalonCard salon={salon} />
      <RouterLink 
        className={styles.link}
        href={buildSalonLink(slug)}
      >
        <Button className={styles.button}>
          Book now
        </Button>
      </RouterLink>
    </div>
  )
}

export default SalonCardLink
