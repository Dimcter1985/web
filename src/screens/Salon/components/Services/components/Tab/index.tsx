import stylesBlock from 'utils/stylesBlock'
import Link from 'components/Link'

import styles from './tab.module.scss'

const b = stylesBlock(styles)

interface IProps {
  activeTab: number
  index: number
  onChange: (value: number) => void
}

const Tab: React.FC<IProps> = ({ activeTab, index, onChange, children }) => {

  const active = activeTab === index

  const onClick = (): void => onChange(index)

  return (
    <Link 
      className={b('item', { active })}
      component='button'
      onClick={onClick}
    >
      { children }
    </Link>
  )
}

export default Tab
