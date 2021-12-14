import React from 'react'
import BaseButton from 'components/Button'

interface IProps {
  className?: string;
  onClick: (event: any) => void;
  changeAnchorEl: (value: HTMLElement) => void;
}

const Button: React.FC<IProps> = ({ className, onClick, changeAnchorEl }) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    changeAnchorEl(event.currentTarget)
    onClick(event)
  }

  return (
    <BaseButton
      className={className}
      onClick={handleClick}
      size='large'
      variant='outlined'
    >
      Add to calendar
    </BaseButton>
  )
}

export default Button
