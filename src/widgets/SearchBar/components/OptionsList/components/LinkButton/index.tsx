import Link, { IProps } from 'components/Link'
import stylesBlock from 'utils/stylesBlock'

import styles from './linkButton.module.scss'

const b = stylesBlock(styles)

const LinkButton: React.FC<IProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <Link 
      className={b('item', className)}
      component='button'
      { ...props }
    >
      { children }
    </Link>
  )
}

export default LinkButton
