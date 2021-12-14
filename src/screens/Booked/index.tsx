import React, { useEffect, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'
import Gradient from 'components/Gradient'
import HiddenOn from 'components/HiddenOn'
import useCart from 'hooks/useCart'
import getEventData from './utils/getEventData'

import ListItem from './components/ListItem'
import ListText from './components/ListText'
import NavItem from './components/NavItem'
import Markets from './components/Markets'
import Container from './components/Container'
import Heading from './components/Heading'
import Subheading from './components/Subheading'
import AddToCalendarButton from './components/AddToCalendarButton'
import styles from './booked.module.scss'

const Booked: React.FC = () => {
  const { push } = useRouter()
  const { ready, appointment } = useCart()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  useEffect(() => {
    if (!ready || appointment) { return }
    push('/')
  }, [ready, appointment])

  const changeAnchorEl = useCallback((value: HTMLElement | null) => {
    setAnchorEl(value)
  }, [setAnchorEl])

  if (!appointment || !ready) { return null }

  return (
    <Layout page={{offsetTop: 'header'}}>
      <Head>
        <title>
          APPOINTMENT BOOKED! - Thank you for booking with Snailz!
        </title>
      </Head>
      <Container>
        <Gradient className={styles.gradient} />
        <Heading>Appointment Booked!</Heading>
        <Subheading>Thank you for booking with Snailz!</Subheading>
        <div className={styles.infoContainer}>
          <div className={styles.listGroup}>
            <ListItem>
              <ListText><b>Do not pay salon directly</b></ListText>
            </ListItem>
            <ListItem>
              <ListText>Your selected payment method will be charged by Snailz at the start time of your appointment</ListText>
            </ListItem>
            <ListItem>
              <ListText>An email confirmation has been sent with additional information</ListText>
            </ListItem>
            <ListItem>
              <ListText>Cancellation fees before the start time may apply</ListText>
            </ListItem>
            <ListItem>
              <ListText>Appointment cannot be cancelled after the start time</ListText>
            </ListItem>
            <ListItem className={styles.listItemMarkets}>
              <ListText>Download our app to book one the go!</ListText>
              <Markets className={styles.marketsInitial} />
            </ListItem>
          </div>
          <Markets className={styles.marketsMobile} />
        </div>
        <div className={styles.navGroup}>
          <HiddenOn tablet mobile>
            <NavItem href='/' variant='outlined'>
              Home
            </NavItem>
          </HiddenOn>
          <NavItem className={styles.button} href='/account/upcoming'>
            View Appointments
          </NavItem>
          <AddToCalendarButton
            buttonProps={{ className: styles.button, changeAnchorEl }}
            dropdownProps={{ anchorEl, changeAnchorEl }}
            event={getEventData(appointment)}
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Booked
