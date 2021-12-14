import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import RouterLink from 'components/RouterLink'
import Button from 'components/Button'
import styles from './ReceiptActionButton.module.scss'

interface IProps {
  href?: string;
  onClick?: () => void;
}

const b = stylesBlock(styles)

const ReceiptActionButton: React.FC<IProps> = ({ href, onClick, children }) => {
  if (href) {
    return(
      <RouterLink className={b('link')} href={href}>
        <Button className={b('button')}>{ children }</Button>
      </RouterLink>
    )
  }

  return (
    <Button className={b('button')} onClick={onClick}>{ children }</Button>
  )
}

export default ReceiptActionButton
