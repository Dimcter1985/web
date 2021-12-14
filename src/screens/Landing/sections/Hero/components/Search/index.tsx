import useInitValues from 'screens/Landing/hooks/useInitialValues'
import BlackTheme from 'components/BlackTheme'

import SearchBar from 'widgets/SearchBar'
import Location from './components/Location'
import Caption from './components/Caption'
import Surface from '../Surface'

import styles from './search.module.scss'

const Search: React.FC = () => {
  const { featuredServices } = useInitValues()
  
  return (
    <BlackTheme className={styles.container}>
      <Surface className={styles.surface}>
        <Caption>Find a salon</Caption>
        <SearchBar
          classes={{ root: styles.searchBar, input: styles.input }}
          featuredServices={featuredServices}
          visibleSearchBtnOnMobile
        />
        <Location />
      </Surface>
    </BlackTheme>
  )
}

export default Search
