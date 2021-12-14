import React from 'react'

import useScrollOffset from 'hooks/useScrollOffset'
import stylesBlock from 'utils/stylesBlock'

import styles from './container.module.scss'

export interface IProps {
  keepBackground?: boolean
}

const b = stylesBlock(styles)

const Container: React.FC<IProps> = ({ keepBackground = false, children }) => {

  const achieved = useScrollOffset(1)

  return (
    <header className={b('container', { 
      background: achieved || keepBackground, 
      shadow: achieved,
    })}>
      { children }
    </header>
  )
}

export default Container
