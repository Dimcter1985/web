import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useMediaQueries from 'hooks/useMediaQueries'
import IconButton from '@material-ui/core/IconButton'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import styles from './ActionButton.module.scss'

interface IProps {
  className?: string
  onClick: () => void
}

const b = stylesBlock(styles)

const CloseButton: React.FC<IProps> = ({ className, onClick }) => {
  const { isSmallScreen } = useMediaQueries()

  if (isSmallScreen) { return null }

  return (
    <IconButton
      className={b('button', className)}
      onClick={onClick}
    >
      <CloseOutlinedIcon className={b('icon')} />
    </IconButton>
  )
}

export default CloseButton
