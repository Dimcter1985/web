import stylesBlock from 'utils/stylesBlock'

import styles from './group.module.scss'

const b = stylesBlock(styles)

const Group: React.FC = ({ children }) => {
  return (
    <div className={b('group')}>
      { children }
    </div>
  )
}

export default Group
