import stylesBlock from 'utils/stylesBlock'

import Text from 'components/Text'

import GroupTitle from '../GroupTitle'
import { ISearchGroup } from '../../../..'

import styles from './groupStateHelper.module.scss'

interface IProps {
  group: ISearchGroup 
  hasItems: boolean
}

const b = stylesBlock(styles)

const GroupStateHelper: React.FC<IProps> = ({ group, hasItems, children }) => {
  const { name, noItemsText } = group

  if (!hasItems) {
    return (
      <>
        <GroupTitle>{ name }</GroupTitle>
        <Text className={b('noItems')}>
          { noItemsText }
        </Text>
      </>
    )
  }

  return (
    <>
      { children }
    </>
  )
}

export default GroupStateHelper
