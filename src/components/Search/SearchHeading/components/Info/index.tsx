import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import useSearch from 'hooks/useSearch'

import useMediaQueries from 'hooks/useMediaQueries'
import styles from './Info.module.scss'

interface IProps {
  total: number
}

const b = stylesBlock(styles)

const Info: React.FC<IProps> = ({ total }) => {
  const { isSmallScreen } = useMediaQueries()
  const { searchPage, query } = useSearch()

  if (!query && !searchPage) { return null }

  return (
    <div className={b('wrapper')}>
      <Text className={b('counts')}>
        { `${total} salons ${isSmallScreen ? 'to book' : ''}` }
      </Text>
      <Text className={b('title')}>
        Book { searchPage ? searchPage.h1 : query }
      </Text>
    </div>
  )
}

export default Info
