import getSalonImageUrl from 'utils/getSalonImageUrl'
import BlackTheme from 'components/BlackTheme'
import stylesBlock from 'utils/stylesBlock'

import styles from './container.module.scss'

interface IProps {
  className?: string
  image: ISalon['image']
}

const b = stylesBlock(styles)

const Container: React.FC<IProps> = ({ className, image, children }) => {
  return (
    <BlackTheme
      className={b('item', className)}
      style={{ backgroundImage: `url(${getSalonImageUrl(image, 'thumb')})` }}
    >
      { children }
    </BlackTheme>
  )
}

export default Container
