import fetchSalons from 'core/api/salons/fetchSalons'
import fetchFeaturedSalons from 'core/api/salons/fetchFeaturedSalons'
import fetchFeaturedServices from 'core/api/services/fetchFeaturedServices'
import { SalonsSortBy, SortDirections } from 'core/consts/sorting'
import Landing from 'screens/Landing'

export default Landing

const salonsQueryFields = `
  id
  name
  address
  addressLine2
  city
  overallRating
  reviewsCount
  slug
  neighborhoods { name }
  image {
    url
    thumbUrl
  }
`

const featuredServicesPagination = { page: 1, size: 5 }
const featuredSalonsPagination = { page: 1, size: 6 }

const topBookedParams = { 
  sort: { order: SortDirections.DESC, sortBy: SalonsSortBy.BOOKED_COUNT },
  pagination: { page: 1, size: 6 }, 
  queryFields: salonsQueryFields,
}

export async function getServerSideProps() {

  const { data: featuredSalons } = await fetchFeaturedSalons({ 
    pagination: featuredSalonsPagination, 
    queryFields: salonsQueryFields,
  })
  const { data: topBookedSalons } = await fetchSalons(topBookedParams)
  const { data: featuredServices } = await fetchFeaturedServices({ 
    pagination: featuredServicesPagination,
  })

  return {
    props: {
      featuredSalons,
      topBookedSalons,
      featuredServices,
    },
  }
}
