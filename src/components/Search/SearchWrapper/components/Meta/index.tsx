import React from 'react'
import Head from 'next/head'
import useSearch from 'hooks/useSearch'
import getSearchPageDescription from 'utils/seo/getSearchPageDescription'
import getSearchPageTitle from 'utils/seo/getSearchPageTitle'

const Meta: React.FC = () => {
  const { searchPage } = useSearch()

  if (!searchPage) {
    return (
      <Head>
        <title>
          Search Best Nail Salons, Spas, and Nail Services in New York City | Snailz New York's Online Nail Salon Booking App
        </title>
      </Head>
    )
  }

  return (
    <Head>
      <title>{getSearchPageTitle(searchPage)}</title>
      <meta
        content={getSearchPageDescription(searchPage)}
        name='description'
      />
    </Head>
  )
}

export default Meta
