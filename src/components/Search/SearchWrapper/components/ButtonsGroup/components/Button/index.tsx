import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import PureButton from 'components/PureButton'
import Text from 'components/Text'
import styles from './Button.module.scss'

interface IProps {
  icon: JSX.Element
  onClick: () => void
}

const b = stylesBlock(styles)

const Button: React.FC<IProps> = ({ icon, onClick, children }) => (
  <PureButton className={b('container')} onClick={onClick}>
    <Text className={b('label')}>{ children }</Text>
    { icon }
  </PureButton>
)

export default Button
