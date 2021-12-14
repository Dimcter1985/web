import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import FormHelperText from '@material-ui/core/FormHelperText'
import styles from './SubmitError.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const SubmitError: React.FC<IProps> = ({ className, children }) => {

  if (!children) { return null }

  return (
    <FormHelperText className={b('text', className)}>
      { children }
    </FormHelperText>
  )
}

export default SubmitError
