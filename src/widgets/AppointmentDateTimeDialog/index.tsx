import React, { forwardRef, useCallback, useState, useMemo, useEffect } from 'react'
import { TransitionProps } from '@material-ui/core/transitions'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import Slide from '@material-ui/core/Slide'
import moment, { Moment } from 'moment-timezone'

import Dialog from 'components/Dialog/Dialog'
import BlackTheme from 'components/BlackTheme'
import Button from 'components/Button'
import TabPanel from 'components/TabPanel'
import useCart from 'hooks/useCart'

import useCurrentSalon from 'hooks/useCurrentSalon'
import TimeSlots from './components/TimeSlots'
import Calendar from './components/Calendar'
import CloseButton from './components/CloseButton'
import MonthsCarousel from './components/MonthsCarousel'
import DaysCarousel from './components/DaysCarousel'
import HeaderGroup from './components/HeaderGroup'
import TabToggle from './components/TabToggle'
import ButtonTabMobileTime from './components/ButtonTabMobileTime'
import MobileCalendarDialog from './components/MobileCalendarDialog'

import styles from './appointmentDateTimeDialog.module.scss'

export type ITab = 'time' | 'calendar'

interface IProps {
  visible: boolean
  onClose: () => void
  onContinue: () => void
}
/* eslint-disable */
const Transition = forwardRef((
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction='up' ref={ref} {...props} />
})
/* eslint-enable */

const AppointmentDateTimeDialog: React.FC<IProps> = ({ 
  visible, 
  onClose, 
  onContinue,
}) => {
  const salon = useCurrentSalon()
  const today = moment().tz(salon.timezone).startOf('day')

  const {
    startsAtInTZ,
    setTimeSlot,
    technicianId,
    slot,
  } = useCart(salon.timezone)

  const [ tab, setTab ] = useState<ITab>('time')
  const [ appoinmentDate, setAppoinmentDate ] = useState<Moment>(today)
  const [ appoinmentTimeSlot, setAppoinmentTimeSlot ] = useState<IAvailableTimeSlot | null>(null)

  const initialDate = useMemo(() => moment().tz(salon.timezone).startOf('day'), [salon.timezone])

  useEffect(() => {
    if (!technicianId || !slot) {
      setAppoinmentTimeSlot(null)
    } else {
      setAppoinmentTimeSlot({ technicianId, slot })
    }
  }, [technicianId, slot])

  useEffect(() => {
    if (!startsAtInTZ) {
      setAppoinmentDate(today)
    } else {
      setAppoinmentDate(startsAtInTZ.startOf('day'))
    }
  }, [startsAtInTZ])

  const toggleTab = () => setTab((prevTab) => prevTab === 'time' ? 'calendar' : 'time')

  const onCalendarChange = useCallback((value: MaterialUiPickersDate) => {
    if (!value) return
    setAppoinmentDate(value)
    setAppoinmentTimeSlot(null)
    setTab('time')
  }, [])

  const onDateCarouselChange = useCallback((value: MaterialUiPickersDate) => {
    if (!value) return
    setAppoinmentDate(value)
    setAppoinmentTimeSlot(null)
  }, [])

  const onContinueClick = () => {
    if (!appoinmentDate || !appoinmentTimeSlot || !salon) return
    const appoinmentDay = moment(appoinmentDate).tz(salon.timezone)

    setTimeSlot({
      startsAt: appoinmentDay.startOf('day').add(appoinmentTimeSlot.slot, 'minutes').toDate(),
      technicianId: appoinmentTimeSlot.technicianId,
    })

    if (onContinue) { onContinue() }
  }

  const onTabMobileCalendarClick = () => setTab('calendar')
  const onTabMobileCalendarClose = () => setTab('time')

  return (
    <Dialog 
      open={visible}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <BlackTheme className={styles.themeWrapper}>
        <HeaderGroup>
          <CloseButton onClick={onClose} />
          <ButtonTabMobileTime onClick={onTabMobileCalendarClick} />
        </HeaderGroup>
        { tab === 'time' && (
          <DaysCarousel
            initialDate={initialDate}
            date={appoinmentDate}
            setDate={onDateCarouselChange}
            />
        )}
        { tab === 'calendar' && (
          <MonthsCarousel
            initialDate={initialDate}
            date={appoinmentDate}
            setDate={onDateCarouselChange} />
        )}
        <TabToggle isOpen={tab === 'calendar'} onClick={toggleTab} />
        <TabPanel 
          key='time'
          index='time'
          value={tab}
          mountWhenHidden
        >
          <TimeSlots date={appoinmentDate} timeSlot={appoinmentTimeSlot} setTimeSlot={setAppoinmentTimeSlot} />
        </TabPanel>
        <TabPanel
          key='calendar'
          index='calendar'
          value={tab}
          mountWhenHidden
        >
          <Calendar value={appoinmentDate} onChange={onCalendarChange} />
        </TabPanel>
        <div className={styles.continueBtnWrapper}>
          <Button 
            className={styles.continueBtn}
            onClick={onContinueClick}
          >
            Continue
          </Button>
        </div>
        <MobileCalendarDialog 
          visible={tab === 'calendar'}
          onClose={onTabMobileCalendarClose}
          date={appoinmentDate}
          onDateChange={onCalendarChange}
        />
      </BlackTheme>
    </Dialog>
  )
}

export default AppointmentDateTimeDialog
