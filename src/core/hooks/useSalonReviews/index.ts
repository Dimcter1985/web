import { useEffect, useMemo } from 'react'
import orderBy from 'lodash/orderBy'

import fetchSalon from 'core/api/salons/fetchSalon'
import useApi from 'core/hooks/useApi'
import { REVIEWS_QUERY_FIELDS } from './consts'
import { ISalonWithReviews } from './types'

interface IUseSalonReviews {
  salon: ISalonWithReviews | null
  loading: boolean
}

interface IProps {
  salonId: number
  queryFields?: string
}

const useSalonReviews = ({ salonId, queryFields }: IProps): IUseSalonReviews => {
  const { fetch, loading, data } = useApi<ISalonWithReviews>(fetchSalon)

  const salon = useMemo(() => {
    if (!data) return null
    return { ...data, reviews: orderBy(data.reviews, 'createdAt', 'desc') }
  }, [data])

  useEffect(() => {
    fetch({
      queryFields: queryFields || REVIEWS_QUERY_FIELDS,
      id: salonId,
    })
  }, [])

  return {
    salon,
    loading,
  }
}

export default useSalonReviews