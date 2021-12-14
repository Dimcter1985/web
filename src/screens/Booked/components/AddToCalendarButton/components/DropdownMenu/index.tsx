import React, { MouseEvent } from 'react'
import stylesBlock from 'utils/stylesBlock'
import Menu from '@material-ui/core/Menu'
import MenuItme from '@material-ui/core/MenuItem'
import styles from './DropdownMenu.module.scss'

interface IProps {
  anchorEl: HTMLElement | null;
  changeAnchorEl: (value: HTMLElement | null) => void;
  onRequestClose: (event: MouseEvent<HTMLElement>) => void;
  children: any[];
}

const b = stylesBlock(styles)

const DropdownMenu: React.FC<IProps> = ({ anchorEl, changeAnchorEl, onRequestClose, children }) => {
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    changeAnchorEl(null)
    onRequestClose(event)
  }
  
  return (
    <Menu
      classes={{ list: b('menu') }}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      { children.map((link: any, index: number) => (
          <MenuItme key={index.toString()} classes={{ root: b('item') }}>
            { link }
          </MenuItme>
        ))
      }
    </Menu>
  )
}

export default DropdownMenu
