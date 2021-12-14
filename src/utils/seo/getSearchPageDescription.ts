import { ISearchPage } from 'api/fetchSearchPage'

const getSearchPageDescription = (searchPage: ISearchPage) => {
  const { h1, city, seoDescription } = searchPage

  if (seoDescription) { return seoDescription }

  return (`${h1} from the Best Salons in ${city}. Reviews on ${h1} in ${city}`)
}

export default getSearchPageDescription
