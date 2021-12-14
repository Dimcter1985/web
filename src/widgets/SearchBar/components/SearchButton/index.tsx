import Button, { ButtonProps } from 'components/Button'
import stylesBlock from 'utils/stylesBlock'

import styles from './searchButton.module.scss'

const b = stylesBlock(styles)

const SearchButton: React.FC<ButtonProps> = ({ 
  className, 
  onClick, 
  children,
}) => {
  return (
    <Button 
      className={b('item', className)}
      color='secondary'
      onClick={onClick}
    >
      { children }
    </Button>
  )
}

export default SearchButton
