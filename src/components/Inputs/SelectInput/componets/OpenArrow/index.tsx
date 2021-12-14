import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useThemeName from 'hooks/useThemeName'
import { white } from 'core/theme/colors'
import ArrowIcon from 'components/Svg/ArrowRight'
import styles from './OpenArrow.module.scss'

const b = stylesBlock(styles)

const OpenArrow: React.FC = (props) => {
  const themeName = useThemeName()

  return (
    <div className={b('icon-wrapper')}>
      <ArrowIcon color={themeName === 'dark' ? white : undefined} {...props} />
    </div>
  )
}

export default OpenArrow
