import stylesBlock from 'utils/stylesBlock'

import styles from './rowContainer.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const RowContainer: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={b('item', null, className)}>
      { children }
    </div>
  )
}

export default RowContainer
