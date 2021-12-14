import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { ButtonProps } from '@material-ui/core/Button'
import Button from 'components/Button'
import styles from './AccountButton.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const AccountButton: React.FC<IProps & ButtonProps> = ({ className, children, ...props }) => (
  <div className={b('wrapper')}>
    <Button className={b('button', className)} {...props}>{ children }</Button>
  </div>
)

export default AccountButton
