import { useEffect } from 'react'

import useApi from 'core/hooks/useApi'
import fetchSalons from 'core/api/salons/fetchSalons'

import Subheading from '../Subheading'
import Salon from './components/Salon'
import ContentGroup from './components/ContentGroup'

import styles from './similar.module.scss'

const queryFields = `
  id
  name
  overallRating
  slug
  image { thumbUrl }
`

const Similar: React.FC = () => {

  const { data, loaded, loading, fetch } = useApi(fetchSalons)

  const salons = data?.data || []

  const isEmpty = !loaded || loading || !salons.length

  useEffect(() => {
    fetch({ 
      queryFields,
      pagination: { page: 1, size: 3 },
      sort: { order: 'DESC', sortBy: 'rating' },
    })
  }, [])

  if (isEmpty) return null

  return (
    <>
      <Subheading className={styles.subheading}>
        Similar Salons
      </Subheading>
      <ContentGroup>
        { salons.map((salon) => (
          <Salon key={salon.id} salon={salon} />
        ))}
      </ContentGroup>
    </>
  )
}

export default Similar
