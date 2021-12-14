import React from 'react'
import HiddenOn from 'components/HiddenOn'

interface IProps {
  index: number;
}

const HIDE_NUMBER = 2

const Block: React.FC<IProps> = ({ index, children }) => {
  if (index === HIDE_NUMBER) {
    return (
      <HiddenOn tablet mobile>
        { children }
      </HiddenOn>
    )
  }

  return (<>{ children }</>)
}

export default Block
