import React, { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import withUserGuard from 'hocs/withUserGuard'
import stylesBlock from 'utils/stylesBlock'

import useApi from 'core/hooks/useApi'
import fetchAppointment from 'core/api/appointments/fetchAppointment'
import { LIST_APPOINTMENT_QUERY_FIELDS } from 'core/api/consts/appointments'
import { DAY_FORMAT, TIME_FORMAT } from 'core/consts/dateTime'
import isPast from 'core/utils/appointments/isPast'
import useCart from 'hooks/useCart'

import AccountLayout from 'components/Account/AccountLayout'
import AccountNavigation from 'components/Account/AccountNavigation'
import Text from 'components/Text'
import AppointmentCaption from 'components/Appointments/AppointmentCaption'
import TitleWithBackArrowOnMobile from 'components/TitleWithBackArrowOnMobile'
import canModify from 'core/utils/appointments/canModify'
import inProgress from 'core/utils/appointments/inProgress'
import VisibleOn from 'components/VisibleOn'
import DetailsText from './components/DetailsText'
import GeneralBlock from './components/GeneralBlock'
import CostLine from './components/CostLine'
import Actions from './components/Actions'
import styles from './AppointmentDetails.module.scss'

const b = stylesBlock(styles)

const AppointmentDetails: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: appointment, fetch } = useApi<IListAppointment>(fetchAppointment)
  const { rebook, modify } = useCart()

  useEffect(() => {
    if (id) {
      fetch({
        queryFields: LIST_APPOINTMENT_QUERY_FIELDS,
        id: parseInt(id as string, 10),
      })
    }
  }, [id])

  const onRebook = useCallback(() => { rebook(appointment!) }, [rebook, appointment])
  
  const onModify = useCallback(() => {
    modify(appointment!.salon.slug, appointment!.id)
  }, [appointment?.salon.slug, appointment?.id, modify])

  const onUpdatePayments = useCallback(() => {
    if (!appointment) { return }
    router.push(`/account/upcoming/${appointment.id}/checkout`, undefined)
  }, [appointment, router])

  if (!appointment) { return null }

  const {
    startsAt,
    salon,
    serviceFee,
    appointmentServices,
    customServices,
    cost,
    tip,
    tax,
    totalAmount,
  } = appointment

  const appointmentDate = moment(startsAt).tz(salon.timezone).format(DAY_FORMAT)
  const appointmentTime = moment(startsAt).tz(salon.timezone).format(TIME_FORMAT)

  return (
    <AccountLayout>
      <AccountNavigation activeItem={isPast(appointment) ? 'past' : 'upcoming'} />
      <div className={b('wrapper')}>
        <TitleWithBackArrowOnMobile className={b('title')}>Appointment details</TitleWithBackArrowOnMobile>
        <div className={b('about-salon')}>
          <div className={b('general')}>
            <GeneralBlock caption='Salon' text={salon.name} />
            <GeneralBlock caption='Time' text={appointmentTime} />
          </div>
          <div className={b('general')}>
            <GeneralBlock caption='Address' text={salon.address} />
            <GeneralBlock caption='Date' text={appointmentDate} />
          </div>
        </div>
        <hr />
        <div className={b('services')}>
          <div className={b('services-row')}>
            <AppointmentCaption>Service(s)</AppointmentCaption>
            { appointmentServices.map((service) => (
              <DetailsText key={service.id} className={b('service-name')}>{ service.name }</DetailsText>
            ))}
            { customServices.map((service) => (
              <DetailsText key={service.id} className={b('service-name')}>{ service.name }</DetailsText>
            ))}
          </div>
          <div className={b('info-wrapper')}>
          <div className={b('quantity-row')}>
            <AppointmentCaption>QTY</AppointmentCaption>
            { appointmentServices.map((service) => (
              <DetailsText
                key={service.id}
                className={b('service-info')}
                position='center'
              >
                { service.quantity }
              </DetailsText>
            ))}
          </div>
          <div className={b('price-row')}>
            <AppointmentCaption>Price</AppointmentCaption>
            { appointmentServices.map((service) => (
              <DetailsText
                key={service.id}
                className={b('service-info')}
                position='right'
              >
                { `$${service.cost}` }
              </DetailsText>
            ))}
            { customServices.map((service) => (
              <DetailsText
                key={service.id}
                className={b('service-info')}
                position='right'
              >
                { `$${service.cost}` }
              </DetailsText>
            ))}
          </div>
          </div>
        </div>
        <hr />
        <div className={b('cost')}>
          <CostLine caption='Subtotal' cost={cost} />
          <CostLine caption='Tip' cost={tip} />
          <CostLine caption='Taxes and fees' cost={tax + serviceFee} />
          <CostLine caption='Total' cost={totalAmount} bold />
        </div>
        <VisibleOn tablet mobile>
          <hr />
        </VisibleOn>
        { canModify(appointment) && !inProgress(appointment) &&
          <Text className={b('note')}>
            Your credit card will be charged at the beginning of your appointment time. See email confirmation for details.
          </Text>
        }
        <Actions
          appointment={appointment}
          onRebook={onRebook}
          onModify={onModify}
          onUpdatePayments={onUpdatePayments}
        />
      </div>
    </AccountLayout>
  )
}

export default withUserGuard(AppointmentDetails)
