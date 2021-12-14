import React from 'react'
import { GetServerSidePropsContext } from 'next'
import moment from 'moment'

import fetchSalon from 'core/api/salons/fetchSalon'
import fetchSearchPage, { ISearchPage } from 'api/fetchSearchPage'
import fetchSalons from 'core/api/salons/fetchSalons'
import fetchSalonSettings from 'core/api/salons/fetchSalonSettings'
import fetchFreeSlots from 'core/api/services/fetchFreeSlots'
import fetchFeaturedServices from 'core/api/services/fetchFeaturedServices'
import { SALON_FIELDS } from 'consts/queryFields'
import { FEATURED_SERVICES_PER_PAGE, PER_PAGE } from 'contexts/search/consts'
import { SortDirections, SalonsSortBy, FreeSlotsSortBy } from 'core/consts/sorting'

import Salon from 'screens/Salon'
import SearchSalons from 'screens/SearchSalons'
import SearchSalonsWithService from 'screens/SearchSalonsWithService'
import getCurrentLocation from 'utils/getCurrentLocation'
import { DEFAULT_TIMEZONE } from 'consts'

interface IInitSalonPage {
  salon: ISalon;
  salonSettings: ISalonSettings;
}

interface IInitSearchPage {
  searchPage: ISearchPage;
  initSalons: IResponseWithTotal<IListSalon>;
  initFreeSlots: IResponseWithTotal<IListFreeSlot>;
  startsAt: string;
  featuredServices: IService[]
}

interface IProps {
  initSalonPage?: IInitSalonPage;
  initSearchPage?: IInitSearchPage;
}

const FromSlugToPage: React.FC<IProps> = ({ initSalonPage, initSearchPage }) => {
  if (initSalonPage) {
    return (
      <Salon
        initSalon={initSalonPage.salon}
        salonSettings={initSalonPage.salonSettings}
      />
    )
  }

  if (initSearchPage!.searchPage.serviceId) {
    return (
      <SearchSalonsWithService
        searchPage={initSearchPage!.searchPage}
        initialData={initSearchPage!.initFreeSlots}
        startsAt={initSearchPage!.startsAt}
        featuredServices={initSearchPage?.featuredServices}
      />
    )
  }
  
  return (
    <SearchSalons
      initSalons={initSearchPage!.initSalons}
      searchPage={initSearchPage!.searchPage}
      featuredServices={initSearchPage?.featuredServices}
    />
  )
}

export default FromSlugToPage

interface IParams {
  slug?: string;
}

export async function getServerSideProps({ params = {}, req }: GetServerSidePropsContext) {
  const { slug }: IParams = params
  const { location } = req.cookies
  const currentPosition = getCurrentLocation(location)

  const [salon, searchPage] = await Promise.all([
    fetchSalon({ 
      queryFields: SALON_FIELDS, 
      slug, 
      lastReviewsCount: 3,
    }).catch((_error) => { return null }),
    fetchSearchPage({ slug }).catch((_error) => { return null }),
  ])

  if (salon) {
    const salonSettings = await fetchSalonSettings<ISalonSettings>({
      salonId: salon.id,
    })
    return { props: { initSalonPage: { salon, salonSettings } } }
  }

  if (searchPage) {
    const { data: featuredServices } = await fetchFeaturedServices({ 
      pagination: { page: 1, size: FEATURED_SERVICES_PER_PAGE },
    })
    if (searchPage.serviceId) {
      const startsAt = moment().tz(DEFAULT_TIMEZONE).toISOString(true)
      const initFreeSlots = await fetchFreeSlots({
        pagination: { page: 1, size: PER_PAGE },
        filters: { serviceIds: [searchPage.serviceId], startsAt,  ...currentPosition },
        sort: { order: SortDirections.ASC, sortBy: FreeSlotsSortBy.DISTANCE },
      })
      return { props: { initSearchPage: { searchPage, initFreeSlots, startsAt, featuredServices } } }
    } 
    const initSalons = await fetchSalons({
      filters: { searchPageId: searchPage.id, ...currentPosition },
      pagination: { page: 1, size: PER_PAGE },
      sort: { order: SortDirections.ASC, sortBy: SalonsSortBy.DISTANCE },
    })
    return { props: { initSearchPage: { searchPage, initSalons, featuredServices } } }
  }

  return { notFound: true }
}
