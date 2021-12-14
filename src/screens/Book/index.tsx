import { useEffect, useCallback , useMemo } from 'react'
import { Form, useField, useFormState, useForm } from 'react-final-form'
import noop from 'lodash/noop'
import withUserGuard from 'hocs/withUserGuard'
import stylesBlock from 'utils/stylesBlock'
import useCart from 'hooks/useCart'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useApi from 'core/hooks/useApi'
import useVisibility from 'hooks/useVisibility'
import fetchSalon from 'core/api/salons/fetchSalon'
import fetchSalonSettings from 'core/api/salons/fetchSalonSettings'
import fetchAppointment from 'core/api/appointments/fetchAppointment'
import createAppointment from 'core/api/appointments/createAppointment'
import updateAppointment from 'core/api/appointments/updateAppointment'
import useRouter from 'hooks/useRouter'
import AppointmentDateTimeDialog from 'widgets/AppointmentDateTimeDialog'
import tipParamsByIndex from 'core/utils/appointments/tipParamsByIndex'
import { CreditCardsProvider } from 'core/contexts/CreditCards'
import { SalonProvider } from 'contexts/salon'
import { SALON_FIELDS } from 'consts/queryFields'
import { SALON_SETTINGS_QUERY_FIELDS } from 'api/consts/salonSetting'
import calculatedDiscount from 'core/api/promo/calculatedDiscount'

import SubmitError from 'components/SubmitError'
import TextInput from 'components/Inputs/TextInput'
import ReceiptContainer from 'components/Receipt/ReceiptContainer'
import ReceiptTitle from 'components/Receipt/ReceiptTitle'
import ReceiptDateTime from 'components/Receipt/ReceiptDateTime'
import ReceiptSalonInfo from 'components/Receipt/ReceiptSalonInfo'
import ReceiptDivider from 'components/Receipt/ReceiptDivider'
import ReceiptContentGroup from 'components/Receipt/ReceiptContentGroup'
import ReceiptCaption from 'components/Receipt/ReceiptCaption'
import ReceiptSerives from 'components/Receipt/ReceiptServices'
import ReceiptActionButton from 'components/Receipt/ReceiptActionButton'
import ReceiptPrices from 'components/Receipt/ReceiptPrices'
import ReceiptSubmitButton from 'components/Receipt/ReceiptSubmitButton'
import ReceiptTip from 'components/Receipt/ReceiptTip'
import HiddenOn from 'components/HiddenOn'
import VisibleOn from 'components/VisibleOn'
import PureButton from 'components/PureButton'
import CancellationPolicyText from 'components/CancellationPolicyText'
import useApp from 'core/hooks/useApp'
import useGlobalSettings from 'core/hooks/useGlobalSettings'
import { ReceiptProvider } from './contexts/receipt'
import UpdateDateTimeBtn from './components/UpdateDateTimeBtn'
import UpdateDateTimeWrapper from './components/UpdateDateTimeWrapper'
import Payment from './components/Payment'
import BottomGroup from './components/BottomGroup'
import Pointz from './components/Pointz'
import ChargeInfo from './components/ChargeInfo'
import ConfirmDialog from './components/ConfirmDialog'
import CardsDrawer from './components/CardsDrawer'
import AddCardDrawer from './components/AddCardDrawer'
import ErrorDialog from './components/ErrorDialog'
import validator from './utils/validator'
import useReceipt from './hooks/useReceipt'
import { ReactComponent as BackArrow } from './icons/back-arrow.svg'
import { IValues, IExtendListAppointment } from './types'
import { initSalon, emptyInitValues, EXTEND_APPOINTMENT_QUERY } from './consts'
import getTipIndex from './utils/getTipIndex'
import styles from './book.module.scss'

interface IProps {
  salonSettings: ISalonSettings
}

const getBalance = (appCredits?: number, userCredits?: number) => (
  (appCredits || 0) + (userCredits || 0)
)

const b = stylesBlock(styles)

const Book: React.FC<IProps> = ({ salonSettings }) => {
  const salon = useCurrentSalon()

  const {
    items,
    startsAtInTZ,
    completed,
    technicianId,
    changeQuantity,
    appointment,
    setAppointment,
  } = useCart(salon.timezone)

  const {
    input: { onChange: onCardIdChange, value: selectedCardId },
  } = useField<number>('cardId')

  const form = useForm()
  
  const { visible: visibleConfirmDialog, show: showConfirmDialog, hide: hideConfirmDialog } = useVisibility(false)
  const { visible: visibleDateTimeDialog, show: showDateTimeDialog, hide: hideDateTimeDialog } = useVisibility(false)
  const { visible: visibleAddCard, show: showAddCard, hide: hideAddCard } = useVisibility(false)
  const { visible: visibleCardsDrawer, show: showCardsDrawer, hide: hideCardsDrawer } = useVisibility(false)
  const { visible: visibleErrorDialog, show: showErrorDialog, hide: hideErrorDialog } = useVisibility(false)
  const { push, back } = useRouter()
  const { submit } = useForm()
  const { values, submitError, valid: formValid } = useFormState<IValues>()
  const { input: { onChange: onDiscountChange } } = useField('discount')
  const { subtotal, tip, taxes, total, cost, discount, credits, serviceFee } = useReceipt()

  const onBackBtnClick = useCallback(() => back(), [back])

  useEffect(() => {
    if (!values.discount?.code || !salon.id) { return }
    calculatedDiscount({
      code: values.discount.code,
      salonId: salon.id,
      services: items.map((item) => ({ serviceId: item.service.id, quantity: item.quantity })),
      appointmentId: appointment?.id,
    })
      .then((newDiscount) => {
        onDiscountChange({ id: newDiscount.id, code: newDiscount.code, amount: newDiscount.amount })
      })
      .catch(({ message }) => alert(message))
  }, [items, values.discount?.code, salon.id, appointment])
  
  const handleSubmit = useCallback(async () => {
    if (appointment) {
      await updateAppointment({
        id: appointment.id,
        specialRequests: values.specialRequests,
        startsAt: startsAtInTZ!.toISOString(),
        services: items.map((item) => ({ serviceId: item.service.id, quantity: item.quantity })),
        technicianId: technicianId!,
        cardFingerprintId: values.cardId!,
        discountId: values.discount?.id,
        credits,
        ...(salon.tipping
          ? { tip }
          : undefined
        ),
      })
        .then(() => push('/account/upcoming'))
        .catch(({ message }) => alert(message))
      return
    }

    createAppointment({
      salonId: salon.id,
      startsAt: startsAtInTZ!.toISOString(),
      services: items.map((item) => ({ serviceId: item.service.id, quantity: item.quantity })),
      technicianId: technicianId!,
      cardFingerprintId: values.cardId!,
      deviceType: 'web',
      appVersion: navigator.appVersion,
      discountId: values.discount?.id,
      specialRequests: values.specialRequests,
      credits,
      ...tipParamsByIndex(cost, values.tipIndex),
    })
      .then((newAppointment: IListAppointment) => {
        setAppointment(newAppointment)
        push('/booked')
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [salon, items, values, technicianId, cost, startsAtInTZ])

  const onBookClick = useCallback(async () => {
    await submit()

    if (form.getFieldState('cardId')?.invalid) {
      showAddCard()
      return
    }
    if(form.getFieldState('tipIndex')?.invalid) {
      showErrorDialog()
      return
    }

    if (appointment) {
      handleSubmit()
      return
    }

    showConfirmDialog()
  }, [handleSubmit, submit, appointment, form])

  const onAddCard = useCallback((cardId: number) => {
    onCardIdChange(cardId)
    hideCardsDrawer()
  }, [onCardIdChange, hideCardsDrawer])

  if (!completed) { return null }

  return (
    <ReceiptContainer className={styles.container} title='Snailz - Book'>
      <HiddenOn tablet mobile>
        <UpdateDateTimeWrapper>
          <UpdateDateTimeBtn onClick={showDateTimeDialog}>
            Modify Date & Time
          </UpdateDateTimeBtn>
        </UpdateDateTimeWrapper>
      </HiddenOn>
      <div className={styles.backWrapp}>
        <VisibleOn tablet mobile>
          <PureButton className={styles.backBtn} onClick={onBackBtnClick}>
            <BackArrow />
          </PureButton>
        </VisibleOn>
        <ReceiptTitle className={styles.title}>Confirm appointment</ReceiptTitle>
      </div>
      <ReceiptDateTime className={styles.dateTime} value={startsAtInTZ!} />
      <ReceiptSalonInfo salon={salon} />
      <ReceiptDivider />
      <ReceiptContentGroup className={styles.services}>
        <ReceiptSerives items={items} changeQuantity={changeQuantity} />
        <ReceiptActionButton href={`/${salon.slug}${appointment ? `?appointment_id=${appointment.id}` : ''}`}>
          Add Service
        </ReceiptActionButton>
        <ReceiptCaption className={styles.specialCaption}>
          Special Request
        </ReceiptCaption>
        <TextInput
          name='specialRequests'
          classes={{ root: styles.specialTextArea }}
          InputProps={{ classes: { input: styles.specialTextAreaInput, inputMultiline: styles.specialTextAreaMultiline } }}
          inputProps={{ maxLength: 100 }} // eslint-disable-line
          multiline
          fullWidth
          placeholder='Have a favorite specialist you’d like to request or any other requests? Let us know here!'
        />
        <ReceiptTip
          name='tipIndex'
          tipping={salon.tipping}
          subtotal={subtotal}
        />
      </ReceiptContentGroup>
      <ReceiptDivider />
      <Payment
        showAddCard={showAddCard}
        showCardsDrawer={showCardsDrawer}
      />
      <ReceiptDivider />
      <ReceiptPrices
        subtotal={subtotal}
        discount={discount}
        credits={credits}
        tip={tip}
        taxes={taxes}
        fees={serviceFee}
        total={total}
      />
      <ReceiptDivider />
      <ReceiptContentGroup>
        <ReceiptCaption>
          Cancellation policy
        </ReceiptCaption>
        <CancellationPolicyText salonSettings={salonSettings} className={styles.cancelPolicy} />
      </ReceiptContentGroup>
      <ReceiptDivider />
      <BottomGroup>
        <ChargeInfo>
          Your credit card will be charged at the beginning of your appointment time. See email confirmation for details.
        </ChargeInfo>
        { submitError && <SubmitError className={styles.submitError}>{submitError}</SubmitError> }
        <ReceiptSubmitButton
          className={b('bookBtn', { disabled: !formValid })}
          onClick={onBookClick}
        >
          { appointment ? 'Update' : 'Book' }
        </ReceiptSubmitButton>
        <Pointz />
      </BottomGroup>
      <AppointmentDateTimeDialog 
        visible={visibleDateTimeDialog}
        onContinue={hideDateTimeDialog}
        onClose={() => push(`/${salon.slug}`)}
      />
      <CardsDrawer
        visible={visibleCardsDrawer}
        hide={hideCardsDrawer}
        showAddCard={showAddCard}
        selectedCardId={selectedCardId}
        onSelectCard={onCardIdChange}
      />
      <AddCardDrawer
        visible={visibleAddCard}
        hide={hideAddCard}
        onSucces={onAddCard}
      />
      <ConfirmDialog
        visible={visibleConfirmDialog}
        hide={hideConfirmDialog}
        onConfirm={handleSubmit}
      />
      <ErrorDialog
        visible={visibleErrorDialog}
        hide={hideErrorDialog}
      />
    </ReceiptContainer>
  )
}


const ConnectedBook: React.FC = () => {
  const { user, refreshUser } = useApp()
  const { salonId, completed, ready, appointment, items } = useCart()
  const { push } = useRouter()
  const { data: salon, fetch: fetchSalonData } = useApi<ISalon>(fetchSalon, { initData: initSalon as ISalon })
  const { data: salonSettings, fetch: fetchSetting } = useApi<ISalonSettings>(fetchSalonSettings)
  const { data: extendApp, fetch: fetchApp } = useApi<IExtendListAppointment>(fetchAppointment)
  const { data: recalculateDiscount, fetch: fetchDiscount } = useApi(calculatedDiscount)
  const { settings: globalSettings } = useGlobalSettings()

  useEffect(() => {
    if (!ready) { return }
    if (!salonId || !completed) {
      push('/')
      return
    }

    refreshUser()
    fetchSalonData({ queryFields: SALON_FIELDS, id: salonId })
    fetchSetting({ salonId, queryFields: SALON_SETTINGS_QUERY_FIELDS })
  }, [salonId, completed, ready])

  useEffect(() => {
    if (!appointment) { return }
    fetchApp({
      queryFields: EXTEND_APPOINTMENT_QUERY,
      id: appointment.id,
    })
  }, [appointment])

  useEffect(() => {
    if (!appointment || !extendApp || !extendApp.discount) { return }
    fetchDiscount({
      code: extendApp.discount.code,
      salonId,
      appointmentId: appointment.id,
      services: items.map((item) => ({ serviceId: item.service.id, quantity: item.quantity })),
    })
  }, [appointment, extendApp, extendApp?.discount])

  const initialValues = useMemo(() => {
    const serviceFee = globalSettings?.serviceFee
    
    if (!extendApp) { 
      return { 
        ...emptyInitValues, 
        serviceFee,
      } 
    }

    return ({
      specialRequests: extendApp.specialRequests,
      cardId: extendApp.cardFingerprintId,
      discount: recalculateDiscount || { ...extendApp.discount, amount: appointment!.discountAmount },
      tipIndex: getTipIndex(appointment!.cost, appointment!.tip),
      usingCredit: !!extendApp.credits,
      serviceFee,
    })
  }, [extendApp, recalculateDiscount, globalSettings])

  const validate = useCallback((values: IValues) => {
    const result = validator({ ...values, tipIndex: salon?.tipping ? values.tipIndex : 3 })
    if (!result) { return undefined }
    const error = Object.entries(result)[0]
    return ({ [error[0]]: error[1] })
  }, [salon?.tipping])

  if (!salonSettings) { return null }

  return (
    <SalonProvider salon={salon!}>
      <CreditCardsProvider>
        <Form
          initialValues={initialValues}
          onSubmit={noop}
          validate={validate}
          render={() => (
            <ReceiptProvider balance={getBalance(extendApp?.credits, user?.credits)}>
              <Book salonSettings={salonSettings} />
            </ReceiptProvider>
          )}
        />
      </CreditCardsProvider>
    </SalonProvider>
  )
}

export default withUserGuard(ConnectedBook)
