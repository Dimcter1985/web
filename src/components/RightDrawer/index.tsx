import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Drawer from 'components/Drawer'
import styles from './RightDrawer.module.scss'

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const b = stylesBlock(styles)

const RightDrawer: React.FC<IProps> = ({ isOpen, onClose, children }) => (
  <Drawer
    open={isOpen}
    anchor='right'
    onClose={onClose}
    classes={{ paper: b('drawer') }}
  >
    { children }
  </Drawer>
)

export default RightDrawer
