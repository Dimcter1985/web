import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { ISearchPage } from 'api/fetchSearchPage'
import { SearchProvider } from 'contexts/search'

import SearchWrapper from 'components/Search/SearchWrapper'
import SearchResultSection from 'components/Search/SearchResultSection'
import SearchMapSection from 'components/Search/SearchMapSection'
import SearchHeading from 'components/Search/SearchHeading'
import SearchSalonList from 'components/Search/SearchSalonsList'
import SearchSalonCard from 'components/Search/SearchSalonCard'
import SearchPagination from 'components/Search/SearchPagination'
import SearchMobileSort from 'components/Search/SearchMobileSort'
import sortOptions from './consts'
import useSearchData from './hooks/useSearchData'

interface IProps {
  initSalons: IResponseWithTotal<IListSalon>
}

const SearchSalons: React.FC<IProps> = ({ initSalons }) => {
  const { push } = useRouter()
  const { salons, page, total, applyPage, sort, setSort } = useSearchData({ initSalons })

  return (
    <SearchWrapper>
      <SearchResultSection>
        <SearchHeading
          total={total}
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
        <SearchSalonList>
          { salons.map((salon) => (
            <SearchSalonCard
              salon={salon}
              onCardClick={() => push(`/${salon.slug}`)}
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
  searchPage?: ISearchPage
  featuredServices?: IService[]
}

const ConnectedSearch: NextPage<IConnectedProps> = ({ searchPage, initSalons, featuredServices }) => (
  <SearchProvider searchPage={searchPage} featuredServices={featuredServices}>
    <SearchSalons initSalons={initSalons} />
  </SearchProvider>
)

export default ConnectedSearch
