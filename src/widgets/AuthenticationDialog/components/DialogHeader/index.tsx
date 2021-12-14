import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './DialogHeader.module.scss'

interface IClasses {
  root?: string
  title?: string
}

interface IProps {
  classes?: IClasses
  leftIcon: JSX.Element
}

const b = stylesBlock(styles)

const DialogHeader: React.FC<IProps> = ({ classes, leftIcon, children }) => (
  <div className={b('wrapper', classes?.root)}>
    { leftIcon }
    <Text className={b('title', classes?.title)}>{ children }</Text>
    <div />
  </div>
)

export default DialogHeader
