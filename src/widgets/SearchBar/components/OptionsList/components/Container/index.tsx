import stylesBlock from 'utils/stylesBlock'
import useThemeName from 'hooks/useThemeName'

import styles from './container.module.scss'

interface IProps {
  visible: boolean
  className?: string
}

const b = stylesBlock(styles)

const Container: React.FC<IProps> = ({ visible, className, children }) => {
  const theme = useThemeName()

  return (
    <div className={b('item', { visible, theme }, className)}>
      { children }
    </div>
  )
}

export default Container
