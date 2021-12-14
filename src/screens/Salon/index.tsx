import React, { useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout, { IProps as ILayoutProps } from 'components/Layout'
import Container from 'components/Container'
import SchemeItem, { ISchemeItemProps } from 'components/SchemeItem'
import { SchemeItemTypes } from 'consts/schemeOrg'
import { SalonProvider } from 'contexts/salon'
import useCart from 'hooks/useCart'
import useApp from 'core/hooks/useApp'
import fetchAppointment from 'core/api/appointments/fetchAppointment'
import useApi from 'core/hooks/useApi'
import { LIST_APPOINTMENT_QUERY_FIELDS } from 'core/api/consts/appointments'
import getCustomService from 'utils/getCustomService'
import useCurrentSalon from 'hooks/useCurrentSalon'

import Address from './components/Address'
import Breadcrumbs from './components/Breadcrumbs'
import ContentLayout from './components/ContentLayout'
import Header from './components/Header'
import Services from './components/Services'
import AsideRight from './components/AsideRight'
import MobilePreviews from './components/MobilePreviews'
import PreviewPhotos from './components/PreviewPhotos'
import RatingGroup from './components/RatingGroup'
import Reviews from './components/Reviews'
import Similar from './components/Similar'
import { Provider } from './contexts/page'
import Scheme from './components/Scheme'
import Meta from './components/Meta'
import Socials from './components/Socials'
import WorkHours from './components/WorkHours'
import CancellationPolicy from './components/CancellationPolicy'
import ItemWrapper from './components/ItemWrapper'
import Description from './components/Description'
import Divider from './components/Divider'
import Specialize from './components/Specialize'
import LoyalityProgram from './components/LoyalityProgram'

interface IConectedProps {
  initSalon: ISalon
  salonSettings: ISalonSettings
}

interface IProps {
  salon: ISalon
  salonSettings: ISalonSettings
}

const headerProps: ILayoutProps['header'] =  { container: { keepBackground: true } }
const pageProps: ILayoutProps['page'] = { offsetTop: 'header' }
const footerProps: ILayoutProps['footer'] = { offset: 'default' }
const schemeItemProps: ISchemeItemProps = { itemScope: true, itemType: SchemeItemTypes.localBusiness }

const DescriptionDivider: React.FC = ({ children }) => {
  const { description, speciality } = useCurrentSalon()

  if (!description && !speciality) { return null }

  return (
    <>
      { children }
      <Divider />
    </>
  )
}

const Salon: React.FC<IProps> = ({ salon, salonSettings }) => {
  return (
    <>
      <Meta salon={salon} />
      <Scheme salon={salon} />
      <Layout 
        header={headerProps}
        page={pageProps} 
        footer={footerProps}
      >
        <SchemeItem {...schemeItemProps} >
          <MobilePreviews />
          <Container>
            <Breadcrumbs />
            <Header />
            <RatingGroup />
            <Address />
            <ContentLayout asideRight={<AsideRight />}>
              <PreviewPhotos />
              <Services />
              <ItemWrapper>
                <Reviews />
                <Description />
                <Specialize />
                <DescriptionDivider />
                <WorkHours />
                <Divider />
                <LoyalityProgram />
                <CancellationPolicy salonSettings={salonSettings} />
                <Divider />
                <Socials />
              </ItemWrapper>
            </ContentLayout>
            <Similar />
          </Container>
        </SchemeItem>
      </Layout>
    </>
  )
}

const ConnectedSalon: NextPage<IConectedProps> = ({ initSalon, salonSettings }) => {
  const { query: { appointment_id: appointmentId } } = useRouter()
  const { data, fetch } = useApi<IListAppointment>(fetchAppointment)
  const { add, clearCart, setAppointment, setTimeSlot, appointment, salonId, hasItems } = useCart()
  const { ready } = useApp()

  const id = useMemo(() => {
    if (!appointmentId) { return null }
    return parseInt(appointmentId as string, 10)
  }, [appointmentId])

  useEffect(() => {
    if (id && ready && !appointment) {
      clearCart()
      fetch({
        id,
        queryFields: LIST_APPOINTMENT_QUERY_FIELDS,
      })
    }
  }, [id, ready, clearCart, appointment])

  useEffect(() => {
    if (!data) { return }
    data.appointmentServices.forEach((service) => {
      add({
        salonId: data.salon.id,
        service: getCustomService(service), quantity: service.quantity,
      })
    })
    setAppointment(data)
    setTimeSlot({ startsAt: data.startsAt, technicianId: data.technicianId })
  }, [data])

  useEffect(() => {
    if (
      (!id && appointment)
      || (id && appointment && id !== appointment.id)
      || (hasItems && salonId !== initSalon.id)
    ) {
      clearCart()
    }
  }, [id, appointment, clearCart, hasItems, salonId, initSalon])

  return (
    <SalonProvider salon={initSalon}>
      <Provider>
        <Salon salon={initSalon} salonSettings={salonSettings} />
      </Provider>
    </SalonProvider>
  )
}

export default ConnectedSalon
