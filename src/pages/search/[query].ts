import { GetServerSidePropsContext } from 'next'

import { SortDirections, SalonsSortBy } from 'core/consts/sorting'
import fetchSalons from 'core/api/salons/fetchSalons'
import fetchFeaturedServices from 'core/api/services/fetchFeaturedServices'
import SearchSalons from 'screens/SearchSalons'
import { PER_PAGE, FEATURED_SERVICES_PER_PAGE } from 'contexts/search/consts'
import getCurrentLocation from 'utils/getCurrentLocation'

export default SearchSalons

interface IParams {
  query?: string
}

export async function getServerSideProps({ params = {}, req }: GetServerSidePropsContext) {
  const { query }: IParams = params
  const { location } = req.cookies
  const currentPosition = getCurrentLocation(location)

  const { data: featuredServices } = await fetchFeaturedServices({ 
    pagination: { page: 1, size: FEATURED_SERVICES_PER_PAGE },
  })

  const initSalons = await fetchSalons({ 
    filters: { searchQuery: query, ...currentPosition },
    pagination: { page: 1, size: PER_PAGE },
    sort: { order: SortDirections.ASC, sortBy: SalonsSortBy.DISTANCE },
  })

  return { props: { initSalons, featuredServices } }
}
