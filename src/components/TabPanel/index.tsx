import React from 'react'

interface IProps {
  mountWhenHidden?: boolean
  className?: string
  index: number | string
  value: number | string
}

const TabPanel: React.FC<IProps> = ({
  mountWhenHidden = false,
  className = '',
  value,
  index,
  children,
}) => {
  return (
    <div
      className={className}
      role='tabpanel'
      hidden={value !== index}
    >
      { mountWhenHidden ? children : value === index && children }
    </div>
  )
}

export default TabPanel
