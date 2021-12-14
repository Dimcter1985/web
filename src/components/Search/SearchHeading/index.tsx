import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { IOption } from 'types/option'
import HiddenOn from 'components/HiddenOn'
import Info from './components/Info'
import Sort from './components/Sort'
import styles from './SearchHeading.module.scss'

interface IProps<T> {
  total: number
  sort: T
  setSort: (newSort: T) => void
  sortOptions: IOption<T>[]
}

const b = stylesBlock(styles)

const SearchHeading = <T extends string>({ total, sort, setSort, sortOptions }: IProps<T>) => {

  return (
    <div className={b('wrapper')}>
      <Info total={total} />
      <HiddenOn tablet mobile>
        <Sort sort={sort} setSort={setSort} sortOptions={sortOptions} />
      </HiddenOn>
    </div>
  )
}

export default SearchHeading
