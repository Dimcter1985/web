import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Divider from 'components/Divider'
import styles from './DialogDivider.module.scss'

const b = stylesBlock(styles)

const DialogDivider: React.FC = () => (
  <Divider className={b('separator')} />
)

export default DialogDivider
