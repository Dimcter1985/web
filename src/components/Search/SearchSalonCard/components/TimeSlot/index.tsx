import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import PureButton from 'components/PureButton'
import Text from 'components/Text'
import { IExtendedTimeSlot } from 'core/hooks/useSearchSalons'
import minutesToDate from 'core/utils/dateTime/minutesToDate'
import { TIME_FORMAT } from 'core/consts/dateTime'
import styles from './TimeSlot.module.scss'

interface IProps {
  slot: IExtendedTimeSlot
  onClick: () => void
}

const b = stylesBlock(styles)

const TimeSlot: React.FC<IProps> = ({ slot, onClick }) => (
  <PureButton className={b('wrapper')} onClick={onClick}>
    <Text className={b('time')}>{ minutesToDate(slot.slot, slot.date).format(TIME_FORMAT) }</Text>
  </PureButton>
)

export default TimeSlot
