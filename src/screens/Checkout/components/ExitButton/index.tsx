import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Button from 'components/Button'
import styles from './ExitButton.module.scss'

interface IProps {
  onClick: () => void;
}

const b = stylesBlock(styles)

const ExitButton: React.FC<IProps> = ({ onClick }) => (
  <Button
    className={b('button')}
    variant='text'
    onClick={onClick}
  >
    Exit
  </Button>
)

export default ExitButton
