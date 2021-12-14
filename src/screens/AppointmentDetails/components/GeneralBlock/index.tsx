import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import AppointmentCaption from 'components/Appointments/AppointmentCaption'
import DetailsText from '../DetailsText'
import styles from './GeneralBlock.module.scss'

interface IProps {
  caption: string;
  text: string;
}

const b = stylesBlock(styles)

const GeneralBlock: React.FC<IProps> = ({ caption, text }) => (
  <div className={b('block')}>
    <AppointmentCaption>{ caption }</AppointmentCaption>
    <DetailsText className={b('text')}>{ text }</DetailsText>
  </div>
)

export default GeneralBlock
