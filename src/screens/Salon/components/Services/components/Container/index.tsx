
import stylesBlock from 'utils/stylesBlock'
import styles from './container.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const Container: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={b('item', className)}>
      { children }
    </div>
  )
}

export default Container
