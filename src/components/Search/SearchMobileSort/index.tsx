import React, { useCallback, useState } from 'react'
import stylesBlock from 'utils/stylesBlock'
import { IOption } from 'types/option'
import useSearch from 'hooks/useSearch'
import DialogWithMobileHeader from 'components/DialogWithMobileHeader'
import PureButton from 'components/PureButton'
import Text from 'components/Text'
import Radio from 'components/Radio'
import Button from 'components/Button'
import styles from './SearchMobileSort.module.scss'

interface IProps<T> {
  sort: T
  setSort: (newSort: T) => void
  sortOptions: IOption<T>[]
}

const b = stylesBlock(styles)

const SearchMobileSort = <T extends string>({ sort, setSort, sortOptions }: IProps<T>) => {
  const { visibleMobileSort, toggleMobileSort } = useSearch()
  const [choiceOption, setChoiceOption] = useState<T>(sort)

  const onConfirm = useCallback(() => {
    if (sort === choiceOption) {
      toggleMobileSort()
      return
    }

    setSort(choiceOption)
    toggleMobileSort()
  }, [sort, choiceOption, toggleMobileSort, setSort])

  return (
    <DialogWithMobileHeader visible={visibleMobileSort} onClose={toggleMobileSort}>
      <div className={b('container')}>
        <Text className={b('title')}>Sort by</Text>
        <div className={b('sorts')}>
          { sortOptions.map((option) => (
            <PureButton className={b('option')} onClick={() => setChoiceOption(option.id)}>
              <Radio checked={option.id === choiceOption} />
              <Text>{ option.name }</Text>
            </PureButton>
          ))}
        </div>
        <Button className={b('confirm-button')} onClick={onConfirm}>
          <Text className={b('confirm-label')}>Apply</Text>
        </Button>
      </div>
    </DialogWithMobileHeader>
  )
}

export default SearchMobileSort
