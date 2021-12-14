import { ChangeEvent, useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'

import { IOption } from 'types/option'
import useVisibility from 'hooks/useVisibility'
import Text from 'components/Text'
import IconButton from 'components/IconButton'
import { RadioGroupInput } from 'components/Inputs/RadioGroupInput'

import { ReactComponent as ArrowIcon } from './icons/arrow.svg'

import styles from './Sort.module.scss'

interface IProps<T> {
  sort: T
  setSort: (newSort: T) => void
  sortOptions: IOption<T>[]
}

const b = stylesBlock(styles)

const Sort = <T extends string>({ sort, setSort, sortOptions }: IProps<T>) => {
  const { visible, toggle } = useVisibility(false)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value as T)
    toggle()
  }, [])

  const sortName = sortOptions.find((rec) => rec.id === sort)!.name

  return (
    <div className={b('container')}>
      <Text className={b('caption')}>SORT BY:</Text>
      <div className={b('sortSection')}>
        { visible ? (
          <RadioGroupInput 
            className={b('radioGroup')}
            value={sort}
            onChange={onChange}
            options={sortOptions}
            optionClassName={b('label')}
          />
        ) :
        <div className={b('currentSort')}>
          <Text className={b('currentSortText')}>{ sortName }</Text>
          <IconButton 
            className={b('icon-button')}
            onClick={toggle}
          >
            <ArrowIcon />
          </IconButton>
        </div>
        }
      </div>
    </div>
  )
}

export default Sort
