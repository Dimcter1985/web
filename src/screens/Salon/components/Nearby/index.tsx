import { useEffect, memo } from 'react'

import useApi from 'core/hooks/useApi'
import fetchSalons from 'core/api/salons/fetchSalons'
import { IMAGE_QUERY_FIELDS } from 'core/api/consts/common'
import useCurrentSalon from 'hooks/useCurrentSalon'
import SalonCard from 'components/SalonCard'
import RouterLink from 'components/RouterLink'
import buildSalonLink from 'utils/buildSalonLink'

import Subheading from '../Subheading'

import styles from './nearby.module.scss'

const queryFields = `
  id
  name
  slug
  overallRating
  reviewsCount
  address
  city
  image { ${IMAGE_QUERY_FIELDS} }
  neighborhoods { id name }
`

// TODO: needs refactor from back
const ensureNotCurrentSalon = (data: IResponseWithTotal<IListSalon> | null, currentSalonId: number): IListSalon[] => {
  if (!data) return []
  const filteredSalons = data.data.filter((rec) => rec.id !== currentSalonId)
  return filteredSalons.length > 3 ? data.data.slice(3) : filteredSalons
}

const classes = { name: styles.name }

const Nearby: React.FC = () => {

  const { data, loaded, loading, fetch } = useApi(fetchSalons)

  const { id, location } = useCurrentSalon()

  const salons = ensureNotCurrentSalon(data, id)
  const isEmpty = !loaded || loading || !salons.length

  useEffect(() => {
    fetch({ 
      queryFields,
      pagination: { page: 1, size: 4 },
      sort: { order: 'asc', sortBy: 'distance' },
      filters: { ...location },
    })
  }, [])

  if (isEmpty) return null

  return (
    <div className={styles.container}>
      <Subheading className={styles.subheading}>
        Nearby Salons
      </Subheading>
      { salons.map((salon) => (
        <RouterLink 
          key={salon.id} 
          href={buildSalonLink(salon.slug)}
          className={styles.salonLink}
        >
          <SalonCard 
            salon={salon as ISalon} 
            className={styles.salonCard} 
            classes={classes} 
          />
        </RouterLink>
      ))}
    </div>
  )
}

export default memo(Nearby)
