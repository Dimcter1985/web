import React, { useCallback, useState } from 'react'
import stylesBlock from 'utils/stylesBlock'

import moment from 'moment'

import useCart from 'hooks/useCart'
import { DAY_FORMAT, TIME_FORMAT } from 'core/consts/dateTime'
import getServicesNames from 'core/utils/appointments/getServicesNames'
import useCancelAppointment from 'hooks/useCancelAppointment'
import useAppointmentStatuses from 'hooks/useAppointmentStatuses'

import BlackTheme from 'components/BlackTheme'
import RouterLink from 'components/RouterLink'
import Text from 'components/Text'
import AppointmentCaption from '../AppointmentCaption'
import AppointmentActions from './components/AppointmentActions'
import Wrapper from './components/Wrapper'
import ConfirmModifyDialog from './components/ConfirmModifyDialog'
import styles from './AppointmentCard.module.scss'

interface IProps {
  appointment: IListAppointment;
}

const b = stylesBlock(styles)

const AppointmentCard: React.FC<IProps> = ({ appointment }) => {

  const { rebook, modify } = useCart()
  const { withPaymentFaild, canModifyServices, canRebook } = useAppointmentStatuses({ appointment })
  const { showCancelDialog } = useCancelAppointment()

  const [ modifyDialogVisible, setModifyDialogVisible ] = useState<boolean>(false)

  const {
    id,
    salon: {
      slug: salonSlug,
      name: salonName,
      address: salonAddress,
      city: salonCity,
      timezone,
    },
    appointmentServices,
    customServices,
    status,
    startsAt,
  } = appointment
  
  const appointmentDate = moment(startsAt).tz(timezone).format(DAY_FORMAT)
  const appointmentTime = moment(startsAt).tz(timezone).format(TIME_FORMAT)
  
  const onCancel = useCallback(() => {
    showCancelDialog(appointment)
  }, [showCancelDialog, appointment])

  const onRebook = useCallback(() => { rebook(appointment) }, [rebook, appointment])
  const onModify = useCallback(() => { modify(salonSlug, id)}, [id, salonSlug, modify])
  const openModifyDialog = () => setModifyDialogVisible(true)
  const closeModifyDialog = () => setModifyDialogVisible(false)

  return (
    <Wrapper>
      <BlackTheme className={b('header', { status })}>
        <div className={b('header-date')}>{ appointmentDate }</div>
        <div className={b('header-time')}>
          { appointmentTime }
          { canModifyServices && ' - in progress' }
          { withPaymentFaild && ' - pending' }
        </div>
        <RouterLink
          className={b('header-details')}
          href={
            `/account/${canRebook
              ? 'past'
              : 'upcoming'}/${id}`
          }
        >
          Details
        </RouterLink>
      </BlackTheme>
      { withPaymentFaild && 
        <div className={b('issue-text')}>
          There was an issue with your card.<br />
          Please update your payment.
        </div>
      }
      <div className={b('info')}>
        <div className={b('info-line')}>
          <AppointmentCaption className={b('title')}>Salon</AppointmentCaption>
          <Text className={b('text')}>{ salonName }</Text>
        </div>
        <div className={b('info-line')}>
          <AppointmentCaption className={b('title')}>Address</AppointmentCaption>
          <Text className={b('text')}>
            { `${salonAddress}, ${salonCity}` }
          </Text>
        </div>
        <div className={b('info-line')}>
          <AppointmentCaption className={b('title')}>Servce(s)</AppointmentCaption>
          <Text className={b('text')}>
            { getServicesNames(appointmentServices, customServices) }
          </Text>
        </div>
      </div>
      <AppointmentActions
        appointment={appointment}
        onRebook={onRebook}
        onCancel={onCancel}
        onModify={openModifyDialog}
      />
      <ConfirmModifyDialog 
        open={modifyDialogVisible}
        onClose={closeModifyDialog}
        onSubmit={onModify}
      />
    </Wrapper>
  )
}

export default AppointmentCard
