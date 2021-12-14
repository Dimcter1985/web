import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useSearch from 'hooks/useSearch'
import Map from './components/Map'
import styles from './SearchMapSection.module.scss'

interface IProps {
  salons?: IListSalon[]
}

const b = stylesBlock(styles)

const SearchMapSection: React.FC<IProps> = ({ salons }) => {
  const { visibleMap } = useSearch()

  if (!visibleMap) { return null }
  
  return (
    <div className={b('map')}>
      <Map salons={salons} />
    </div>
  )
}

export default SearchMapSection
