import MuiMenuItem, { IProps } from 'components/MenuItem'

import styles from './menuItem.module.scss'

const MenuItem: React.FC<IProps> = ({ children, button, ...props }) => {
  return (
    <MuiMenuItem 
      className={styles.item}
      component='div'
      {...props}
    >
      { children }
    </MuiMenuItem>
  )
}

export default MenuItem
