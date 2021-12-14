import stylesBlock from 'utils/stylesBlock'
import useThemeName from 'hooks/useThemeName'
import Link, { IProps } from 'components/Link'

import styles from './clearBtn.module.scss'

const b = stylesBlock(styles)

const ClearBtn: React.FC<IProps> = (props) => {
  const theme = useThemeName()
  
  return (
    <Link 
      className={b('item', { theme })}
      component='button'
      {...props}
    >
      Clear
    </Link>
  )
}

export default ClearBtn
