import stylesBlock from 'utils/stylesBlock'
import styles from './container.module.scss'

const b = stylesBlock(styles)

interface IProps {
  className?: string
}

const Container: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={b('container', null, className)}>
      { children }
    </div>
  )
}

export default Container
