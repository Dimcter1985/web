import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useThemeName from 'hooks/useThemeName'

import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'

import VisibleOn from 'components/VisibleOn'
import IconButton from 'components/IconButton'
import Snailz from 'components/Svg/Snailz'
import { white } from 'core/theme/colors'

import styles from './DialogWithMobileHeader.module.scss'

interface IProps {
  className?: string
  visible: boolean
  fullScreen?: boolean
  hideCross?: boolean
  onClose: () => void
}

type DialogWithMobileHeaderProps = IProps & Omit<DialogProps, 'open'> 

const b = stylesBlock(styles)

const DialogWithMobileHeader: React.FC<DialogWithMobileHeaderProps> = ({
  className,
  visible,
  fullScreen = true,
  hideCross,
  onClose,
  classes,
  children,
  ...props
}) => {
  const themeName = useThemeName()

  return (
    <Dialog
      classes={{ paper: b('paper', className), ...classes }}
      open={visible}
      fullScreen={fullScreen}
      onClose={onClose}
      {...props}
    >
      <VisibleOn tablet mobile>
        <div className={b('headerGroup')}>
          { !hideCross &&
            <IconButton className={b('cross')} size='small' onClick={onClose}>
              <CloseIcon color='primary' />
            </IconButton>
          }
          <Snailz width={85} height={32} color={themeName === 'dark' ? white : undefined} />
        </div>
      </VisibleOn>
      { children }
    </Dialog>
  )
}

export default DialogWithMobileHeader
