import { Fragment } from 'react'

import GroupTitle from './components/GroupTitle'
import Loader from './components/Loader'
import Container from './components/Container'
import GroupStateHelper from './components/GroupStateHelper'
import SearchStateHelper from './components/SearchStateHelper'
import Option from './components/Option'
import { ISearchOptions, ISearchOption } from '../..'

export interface IProps {
  visible: boolean
  hasSearchValue: boolean
  baseOptionsLoading: boolean
  baseOptionsGroup: ISearchOptions
  searchLoading: boolean
  searchOptionsGroup: ISearchOptions
  onSelect: (option: ISearchOption) => void
  className?: string
}

const OptionsList: React.FC<IProps> = ({
  className,
  visible,
  hasSearchValue,
  baseOptionsLoading,
  baseOptionsGroup,
  searchLoading,
  searchOptionsGroup,
  onSelect,
}) => {

  if (hasSearchValue) {
    return (
      <Container visible={visible} className={className}>
        <SearchStateHelper options={searchOptionsGroup}>
          { searchLoading 
            ? <Loader />
            : searchOptionsGroup.map((group) => (
              <GroupStateHelper 
                key={group.name} 
                hasItems={!!group.options.length}
                group={group}
              >
                <GroupTitle>{ group.name }</GroupTitle>
                <div>
                  { group.options.map((option: ISearchOption) => (
                    <Option
                      key={option.id}
                      option={option}
                      onClick={onSelect}
                    />
                  ))}
                </div>
              </GroupStateHelper>
            ))
          }
        </SearchStateHelper>
      </Container>
    )
  }

  return (
    <Container visible={visible} className={className}>
      { baseOptionsLoading 
        ? <Loader />
        : baseOptionsGroup.map((group) => (
          <Fragment key={group.name}>
            <GroupTitle>{ group.name }</GroupTitle>
            { group.options.map((option: ISearchOption) => (
              <Option 
                key={option.id} 
                option={option} 
                onClick={onSelect} 
              />
            ))}
          </Fragment>
        ))
      }
    </Container>
  )
}

export default OptionsList
