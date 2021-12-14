import { ElementType } from 'react'
import MuiMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

export type IProps = MenuItemProps & {
  component?: ElementType<any>
}

const MenuItem: React.FC = (props) => {
  return (
    <MuiMenuItem {...props} />
  )
}

export default MenuItem
