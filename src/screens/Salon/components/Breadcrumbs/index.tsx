import BreadcrumbsBase from 'components/Breadcrumbs'
import useCurrentSalon from 'hooks/useCurrentSalon'

import styles from './breadcrumbs.module.scss'

const Breadcrumbs: React.FC = () => {

  const { name } = useCurrentSalon()

  const breadcrumbs = [
    { text: 'salons', href: '/search' },
    { text: name },
  ]

  return (
    <BreadcrumbsBase 
      className={styles.item}
      breadcrumbs={breadcrumbs} 
    />
  )
}

export default Breadcrumbs
