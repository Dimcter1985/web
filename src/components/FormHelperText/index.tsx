import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { TextFieldProps } from '@material-ui/core'
import InputError from 'components/InputError'
import styles from './FormHelperText.module.scss'

interface IProps {
  variant?: TextFieldProps['variant']
  error?: TextFieldProps['error']
}

const b = stylesBlock(styles)

const FormHelperText: React.FC<IProps> = ({ variant, error, children }) => (
  <div className={b('root', { variant, error })}>
    { error
      ? <InputError>{ children }</InputError>
      : children
    }
  </div>
)

export default FormHelperText
