import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useSearch from 'hooks/useSearch'
import BlackTheme from 'components/BlackTheme'
import Button from './components/Button'
import { ReactComponent as MapIcon } from './icons/map.svg'
import { ReactComponent as ListIcon } from './icons/list.svg'
import { ReactComponent as SortIcon } from './icons/sort.svg'
import styles from './ButtonsGroup.module.scss'

const b = stylesBlock(styles)

const ButtonsGroup: React.FC = () => {
  const { visibleMobileSort, visibleList, toggleList, toggleMobileSort } = useSearch()

  if (visibleMobileSort) { return null }
  
  return (
    <BlackTheme className={b('wrapper')}>
      <Button
        icon={visibleList ? <MapIcon /> : <ListIcon />}
        onClick={toggleList}
      >
        { visibleList ? 'Map' : 'List' }
      </Button>
      <Button icon={<SortIcon />} onClick={toggleMobileSort}>Sort</Button>
    </BlackTheme>
  )
}

export default ButtonsGroup
