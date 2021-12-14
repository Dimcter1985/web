import React from 'react'
import PureLink, { IProps } from 'components/PureLink'

import MenuItem from '../MenuItem'

const MenuItemLink: React.FC<IProps> = React.forwardRef<HTMLLIElement, IProps>((props, ref) => {
  return (
    <MenuItem ref={ref}>
      <PureLink {...props} />
    </MenuItem>
  )
})

export default MenuItemLink
