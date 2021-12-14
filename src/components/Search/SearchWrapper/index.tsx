import React from 'react'
import { useRouter } from 'next/router'
import stylesBlock from 'utils/stylesBlock'
import useSearch from 'hooks/useSearch'
import useMediaQueries from 'hooks/useMediaQueries'
import Layout from 'components/Layout'
import VisibleOn from 'components/VisibleOn'
import IconButton from 'components/IconButton'
import BackArrow from 'components/Svg/BackArrow'
import SearchBar from 'widgets/SearchBar'
import Meta from './components/Meta'
import ButtonsGroup from './components/ButtonsGroup'
import styles from './SearchWrapper.module.scss'

const b = stylesBlock(styles)

const SearchWrapper: React.FC = ({ children }) => {
  const { back } = useRouter()
  const { searchPage, query, featuredServices } = useSearch()
  const { isSmallScreen } = useMediaQueries()

  return (
    <Layout
      className={b('root')}
      page={{ offsetTop: 'header', className: b('page-container') }}
      footer={{ hide: isSmallScreen }}
    >
      <Meta />
      <div className={b('search-bar-wrapper')}>
        <VisibleOn tablet mobile>
          <IconButton onClick={back}>
            <BackArrow />
          </IconButton>
        </VisibleOn>
        <SearchBar
          classes={{ root: b('search-bar') }}
          initialValue={searchPage?.h1 || query}
          featuredServices={featuredServices}
        />
      </div>
      <div className={b('container')}>
        { children }
        <VisibleOn tablet mobile>
          <ButtonsGroup />
        </VisibleOn>
      </div>
    </Layout>
  ) 
}

export default SearchWrapper
