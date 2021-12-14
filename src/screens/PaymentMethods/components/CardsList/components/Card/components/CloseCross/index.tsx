import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseCrossIcon } from '../../icons/close-cross.svg'

interface IProps {
  onClick: () => void;
  className?: string;
}

const CloseCross: React.FC<IProps> = ({ onClick, className }) => (
  <IconButton className={className} onClick={onClick}>
    <CloseCrossIcon />
  </IconButton>
)

export default CloseCross
