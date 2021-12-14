import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import stylesBlock from 'utils/stylesBlock'

import withUserGuard from 'hocs/withUserGuard'
import useCreditCards from 'core/hooks/useCreditCards'
import { CreditCardsProvider } from 'core/contexts/CreditCards'
import useApi from 'core/hooks/useApi'
import fetchAppointment from 'core/api/appointments/fetchAppointment'
import updateAppointment from 'core/api/appointments/updateAppointment'

import Text from 'components/Text'
import RightDrawer from 'components/RightDrawer'
import AddCardForm from 'components/AddCardForm'
import ReceiptContainer from 'components/Receipt/ReceiptContainer'
import ReceiptTitle from 'components/Receipt/ReceiptTitle'
import ReceiptDateTime from 'components/Receipt/ReceiptDateTime'
import ReceiptSalonInfo from 'components/Receipt/ReceiptSalonInfo'
import ReceiptDivider from 'components/Receipt/ReceiptDivider'
import ReceiptContentGroup from 'components/Receipt/ReceiptContentGroup'
import ReceiptSerives from 'components/Receipt/ReceiptServices'
import ReceiptPrices from 'components/Receipt/ReceiptPrices'
import ReceiptSubmitButton from 'components/Receipt/ReceiptSubmitButton'
import ReceiptActionButton from 'components/Receipt/ReceiptActionButton'
import ReceiptTextAccent from 'components/Receipt/ReceiptTextAccent'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogTitle from 'components/ConfirmDialog/ConfirmDialogTitle'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import ExitButton from './components/ExitButton'
import ErrorMessage from './components/ErrorMessage'
import Card from './components/Card'
import { ICheckoutAppointment, LIST_APPOINTMENT_QUERY_FIELDS, RETURN_LIST_APPOINTMENT_QUERY_FIELD } from './consts'

import styles from './Checkout.module.scss'

const b = stylesBlock(styles)

const today = moment()

const Checkout: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { push } = useRouter()
  const { cards, createCard } = useCreditCards()
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [problemCards, setProblemCards] = useState<Array<number>>([])
  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false)
  const [visibleAddCardDrawer, setVisibleAddCardDrawer] = useState(false)
  const [sendedData, setSendedData] = useState(false)
  const { data: appointment, fetch } = useApi<ICheckoutAppointment>(fetchAppointment)
  
  const services = useMemo(() => {
    if (!appointment) { return [] }

    return appointment.appointmentServices.map((service) => ({
      service: { id: service.id, name: service.name, cost: service.cost },
      quantity: service.quantity,
    }))
  }, [appointment])
  
  useEffect (() => {
    if (id) {
      fetch({
        queryFields: LIST_APPOINTMENT_QUERY_FIELDS,
        id: parseInt(id as string, 10),
      })
    }
  }, [id])

  useEffect(() => {
    if (appointment) {
      setActiveCard(appointment.cardFingerprintId)
      setProblemCards((prev) => [...prev, appointment.cardFingerprintId])
    }
  }, [appointment])

  const onExit = useCallback(() => {
    push('/account/upcoming')
  }, [push])

  const changeActiveCard = useCallback((cardId: number) => {
    setActiveCard(cardId)
  }, [setActiveCard])

  const submit = useCallback(() => {
    setSendedData(true)
    updateAppointment({
      queryFields: RETURN_LIST_APPOINTMENT_QUERY_FIELD,
      id: appointment!.id,
      cardFingerprintId: activeCard!,
    })
      .then(() => {
        setVisibleConfirmDialog(true)
      })
      .catch((error) => {
        setProblemCards((prev) => [...prev, activeCard!])
        alert(error)
      })
      .finally(() => setSendedData(false))
  }, [appointment, activeCard, setVisibleConfirmDialog, setSendedData])

  const closeAddCardDrawer = useCallback(() => setVisibleAddCardDrawer(false), [setVisibleAddCardDrawer])
  const showAddCardDrawer = useCallback(() => setVisibleAddCardDrawer(true), [setVisibleAddCardDrawer])

  const addNewCard = useCallback((values: any) => {
    createCard({
      ...values,
      expirationDate: values.expirationDate.format('MM/YY'),
    })
      .catch((error) => alert(error))
      .finally(() => setVisibleAddCardDrawer(false))
  }, [createCard])


  if (!appointment) { return null }

  const {
    startsAt,
    salon,
    cost,
    discount,
    credits,
    tax,
    tip,
    totalAmount,
    serviceFee,
  } = appointment

  return (
    <ReceiptContainer>
      <ExitButton onClick={onExit} />
      <ReceiptTitle>Unsuccessful payment</ReceiptTitle>
      <Text className={b('pending')}>Pending</Text>
      <ReceiptDateTime
        className={b('date-time')}
        value={moment(startsAt).tz(salon.timezone)}
      />
      <ReceiptSalonInfo salon={salon} />
      <ReceiptDivider />
      <ReceiptContentGroup>
        <ReceiptSerives items={services} />
      </ReceiptContentGroup>
      <ReceiptDivider />
      <ReceiptPrices
        subtotal={cost}
        discount={discount?.amount}
        credits={credits}
        tip={tip}
        taxes={tax}
        fees={serviceFee}
        total={totalAmount}
      />
      <ReceiptDivider />
      <ReceiptContentGroup>
        <ErrorMessage />
        <div className={b('card-list')}>
          <ReceiptTextAccent className={b('title')}>Select payment</ReceiptTextAccent>
          { cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isActive={activeCard === card.id}
              isProblem={!!problemCards.find((problemCard) => problemCard === card.id)}
              onClick={() => changeActiveCard(card.id)}
              today={today}
            />
          ))}
        </div>
        <ReceiptActionButton onClick={showAddCardDrawer}>
          Add card
        </ReceiptActionButton>
      </ReceiptContentGroup>
      <ReceiptDivider />
      <ReceiptSubmitButton
        className={b('submit-button')}
        onClick={submit}
        disabled={sendedData}
      >
        Authorize payment
      </ReceiptSubmitButton>
      <RightDrawer
        isOpen={visibleAddCardDrawer}
        onClose={closeAddCardDrawer}
      >
        <AddCardForm onAdd={addNewCard} onClose={closeAddCardDrawer} />
      </RightDrawer>
      <ConfirmDialogWrapper
        open={visibleConfirmDialog}
        onClose={onExit}
        className={b('dialog-wrapper')}
      >
        <ConfirmDialogTitle className={b('dialog-title')}>
          Your payment was<br />SUCCESSFULL!
        </ConfirmDialogTitle>
        <ConfirmDialogContent>
          Your card was charged for booked services.
        </ConfirmDialogContent>
        <ConfirmDialogActions>
          <ConfirmDialogButton onClick={onExit}>My account</ConfirmDialogButton>
        </ConfirmDialogActions>
      </ConfirmDialogWrapper>
    </ReceiptContainer>
  )
}

const ConnectedCreditCards = () => (
  <CreditCardsProvider>
    <Checkout />
  </CreditCardsProvider>
)

export default withUserGuard(ConnectedCreditCards)
