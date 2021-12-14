import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useMediaQueries from 'hooks/useMediaQueries'
import InputError from 'components/InputError'
import styles from './ReceiptError.module.scss'

interface IClasses {
  root?: string
  icon?: string
}

interface IProps {
  classes?: IClasses
}

const b = stylesBlock(styles)

const ReceiptError: React.FC<IProps> = ({ classes, children }) => {
  const { isSmallScreen } = useMediaQueries()

  return (
    <InputError
      classes={{ root: classes?.root, text: b('error-text'), icon: classes?.icon }}
      size={isSmallScreen ? 'normal' : 'large'}
    >
      { children }
    </InputError>
  )
}

export default ReceiptError
