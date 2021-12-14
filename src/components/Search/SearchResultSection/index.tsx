import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useSearch from 'hooks/useSearch'
import styles from './SearchResultSection.module.scss'

const b = stylesBlock(styles)

const SearchResultSection: React.FC = ({ children }) => {
  const { visibleList } = useSearch()

  if (!visibleList) { return null }

  return (
    <div className={b('container')}>
      <div className={b('result')}>
        { children }
      </div>
    </div>
  )
}

export default SearchResultSection
