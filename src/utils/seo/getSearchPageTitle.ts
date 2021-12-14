import { ISearchPage } from 'api/fetchSearchPage'

const defaultTitle = (searchPage: ISearchPage): string => {
  const { id, city, h1 } = searchPage

  const titles = [
    `${h1}s from the Best Salons in ${city}s | Snailz the Nail Salon Booking App`,
    `${h1}s from the Best Salons in ${city}s | Snailz the ${city}s Nail Booking App`,
    `${h1}s from the Best Nail Places in ${city}s | Snailz the Nail Salon Booking App`,
    `${h1}s from the Best Nail Salons in ${city}s | Snailz the ${city}s Nail Salon Booking App`,
  ]

  const index = id % 4

  return titles[index]
}

const getSearchPageTitle = (searchPage: ISearchPage) => {
  const { seoTitle } = searchPage

  if (seoTitle) { return seoTitle }

  return defaultTitle(searchPage)
}

export default getSearchPageTitle
