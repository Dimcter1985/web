import stylesBlock from 'utils/stylesBlock'

import { ReactComponent as MarkIcon } from './icons/mark.svg'

import styles from './listItem.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const ListItem: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={b('container', className)}>
      <MarkIcon className={styles.icon} />
      { children }
    </div>
  )
}

export default ListItem
