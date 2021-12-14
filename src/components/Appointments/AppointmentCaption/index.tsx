import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './AppointmentCaption.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const AppointmentCaption: React.FC<IProps> = ({ className, children }) => (
  <Text className={b('caption', className)}>{ children }</Text>
)

export default AppointmentCaption
