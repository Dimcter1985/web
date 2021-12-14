import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Divider from 'components/Divider'
import HiddenOn from 'components/HiddenOn'
import styles from './SearchSalonList.module.scss'

const b = stylesBlock(styles)

const SearchSalonList: React.FC = ({ children }) => (
  <div className={b('list')}>
    <HiddenOn tablet mobile>
      <Divider />
    </HiddenOn>
    { children }
  </div>
)

export default SearchSalonList
