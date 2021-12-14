import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'

import GroupTitle from '../GroupTitle'
import { ISearchOptions } from '../../../..'

import styles from './searchStateHelper.module.scss'

interface IProps {
  options: ISearchOptions
}

const b = stylesBlock(styles)

const SearchStateHelper: React.FC<IProps> = ({ options, children }) => {
  const noItems = !options[0].options.length && !options[1].options.length

  if (noItems) {
    return (
      <div className={b('container')}>
        <GroupTitle className={b('title')}>
          Matching Services
        </GroupTitle>
        <GroupTitle className={b('title')}>
          Matching Salons
        </GroupTitle>
        <Text className={b('text')}>
          No services or salons match this search. 
          <br />
          Please, try again.  
        </Text>
      </div>
    )
  }

  return (
    <>
      { children }
    </>
  )
}

export default SearchStateHelper
