import stylesBlock from 'utils/stylesBlock'

import styles from './row.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const Row: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={b('item', className)}>
      { children }
    </div>
  )
}

export default Row
