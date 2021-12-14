import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import DialogContent from 'components/Dialog/DialogContent'
import Text from 'components/Text'
import styles from './ConfirmDialogContent.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const ConfirmDialogContent: React.FC<IProps> = ({ className, children }) => (
  <DialogContent className={b('content', className)}>
    <Text className={b('text')}>
      { children }
    </Text>
  </DialogContent>
)

export default ConfirmDialogContent
