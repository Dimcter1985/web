import React, { useCallback, useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useCart from 'hooks/useCart'
import { ISearchPage } from 'api/fetchSearchPage'
import { SearchProvider } from 'contexts/search'

import SearchWrapper from 'components/Search/SearchWrapper'
import SearchResultSection from 'components/Search/SearchResultSection'
import SearchHeading from 'components/Search/SearchHeading'
import SearchSalonList from 'components/Search/SearchSalonsList'
import SearchSalonCard from 'components/Search/SearchSalonCard'
import SearchPagination from 'components/Search/SearchPagination'
import SearchMapSection from 'components/Search/SearchMapSection'
import SearchMobileSort from 'components/Search/SearchMobileSort'
import sortOptions from './consts'
import useSearchData from './hooks/useSearchData'

interface IProps {
  initialData: IResponseWithTotal<IListFreeSlot>
  startsAt: string
}

const SearchSalonsWithService: React.FC<IProps> = ({ initialData, startsAt }) => {
  const { push } = useRouter()
  const { clearCart, add, setTimeSlot } = useCart()
  const { searchedSalons, page, total, applyPage, sort, setSort } = useSearchData({ initialData, startsAt })
  
  const salons = useMemo(() => searchedSalons.map(({ salon }) => salon), [searchedSalons])

  const onCardClick = useCallback((salon: IListSalon, services: IService[]) => {
    const { id: salonId, slug } = salon
    clearCart()
    services.forEach((service) => add({ salonId, service }))
    push(`/${slug}`)
  }, [clearCart, add, push])

  const onTimeSlotClick = useCallback((
    salon: IListSalon, services: IService[], timeStart: Date, technicianId: number,
    ) => {
      const { id: salonId, slug } = salon
      clearCart()
      setTimeSlot({ startsAt: timeStart, technicianId })
      services.forEach((service) => add({ salonId, service }))
      push(`/${slug}`)
  }, [clearCart, add, setTimeSlot, push])

  return (
    <SearchWrapper>
      <SearchResultSection>
        <SearchHeading total={total} sort={sort} setSort={setSort} sortOptions={sortOptions} />
        <SearchSalonList>
          { searchedSalons.map(({ salon, slots, bookServices }) => (
            <SearchSalonCard
              key={salon.id}
              salon={salon}
              services={bookServices}
              slots={slots}
              onCardClick={() => onCardClick(salon, bookServices)}
              onTimeSlotClick={onTimeSlotClick}
            />
          ))}
        </SearchSalonList>
        <SearchPagination page={page} total={total} applyPage={applyPage} />
      </SearchResultSection>
      <SearchMapSection salons={salons} />
      <SearchMobileSort sort={sort} setSort={setSort} sortOptions={sortOptions} />
    </SearchWrapper>
  )
}

interface IConnectedProps extends IProps {
  searchPage: ISearchPage
  featuredServices?: IService[]
}

const ConnectedSearchWithService: NextPage<IConnectedProps> = ({ searchPage, initialData, startsAt, featuredServices }) => (
  <SearchProvider searchPage={searchPage} featuredServices={featuredServices}>
    <SearchSalonsWithService initialData={initialData} startsAt={startsAt} />
  </SearchProvider>
)

export default ConnectedSearchWithService
