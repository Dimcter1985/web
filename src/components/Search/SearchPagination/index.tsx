import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import useMediaQueries from 'hooks/useMediaQueries'
import getPaginationCount from 'utils/getPaginationCount'
import { PER_PAGE } from 'contexts/search/consts'
import PaginationBase from 'components/Pagination'
import Text from 'components/Text'
import BackArrow from 'components/Svg/BackArrow'
import IconButton from 'components/IconButton'
import styles from './SearchPagination.module.scss'

interface IProps {
  page: number
  total: number
  applyPage: (page: number) => void
}

const b = stylesBlock(styles)

const getCounters = (page: number, total: number): string => {
  const min = page * PER_PAGE - (PER_PAGE - 1)
  const max = page * PER_PAGE
  if (min === total) { return min.toString() }
  return `${min}-${max > total ? total : max}`
}

const SearchPagination: React.FC<IProps> = ({ page, total, applyPage }) => {
  const { isSmallScreen } = useMediaQueries()
  const count = getPaginationCount({ total, perPage: PER_PAGE })

  const onChange = (_: any, value: number): void => applyPage(value)

  const onLeftArrowClick = useCallback(() => {
    if (page === 1) { return }
    applyPage(page - 1)
  }, [page])

  const onRightArrowClick = useCallback(() => {
    if (page === count) { return }
    applyPage(page + 1)
  }, [page, count])

  if (total <= PER_PAGE) return null

  if (isSmallScreen) {
    return (
      <div className={b('wrapper')}>
        <IconButton className={b('left-arrow', { notActive: page === 1 })} onClick={onLeftArrowClick}>
          <BackArrow />
        </IconButton>
        <IconButton className={b('right-arrow', { notActive: page === count })} onClick={onRightArrowClick}>
          <BackArrow />
        </IconButton>
      </div>
    )
  }

  return (
    <>
      <PaginationBase
        className={b('pagination')}
        count={count}
        page={page}
        onChange={onChange}
      />
      <Text className={b('count')}>{`${getCounters(page, total)} of ${total} salons to book`}</Text>
    </>
  )
}

export default SearchPagination
