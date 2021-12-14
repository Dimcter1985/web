import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import BaseDialogContent from 'components/Dialog/DialogContent'
import styles from './DialogContent.module.scss'

const b = stylesBlock(styles)

const DialogContent: React.FC = ({ children }) => (
  <BaseDialogContent classes={{ root: b('dialog-root') }}>
    { children }
  </BaseDialogContent>
)

export default DialogContent
