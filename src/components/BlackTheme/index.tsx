import React, { LegacyRef } from 'react'

import stylesBlock from 'utils/stylesBlock'
import { ThemeProvider } from '@material-ui/core/styles'
import blackTheme from '../../blackTheme'
import styles from './black_theme.module.scss'


interface IProps {
  className?: string
  forwardRef?: LegacyRef<HTMLDivElement>
  style?: React.CSSProperties
}

const cls = stylesBlock(styles)

const BlackTheme: React.FC<IProps> = ({ className, forwardRef, style, children }) => {
  return (
    <ThemeProvider theme={blackTheme}>
      <div 
        className={cls('root', null, className)}
        ref={forwardRef}
        style={style}
      >
        { children }
      </div>
    </ThemeProvider>
  )
}

export default BlackTheme
