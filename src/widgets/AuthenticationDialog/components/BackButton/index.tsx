import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import styles from '../CloseButton/ActionButton.module.scss'

interface IProps {
  className?: string
  onClick: () => void
}

const b = stylesBlock(styles)

const BackButton: React.FC<IProps> = ({ className, onClick }) => (
  <IconButton
    className={b('button', className)}
    onClick={onClick}
  >
    <ArrowBackIosOutlinedIcon className={b('icon')} />
  </IconButton>
)

export default BackButton
