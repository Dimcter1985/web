import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import dateMomentUtils from '@date-io/moment'

import { AppointmentsProvider } from 'core/contexts/Appointments'
import { GeolocationProvider } from 'core/contexts/Geolocation'
import { AuthDialogProvider } from 'contexts/AuthDialog'
import { StorageProvider } from 'core/contexts/Storage'
import { AppProvider } from 'core/contexts/App'
import Storage from 'core/utils/storage'
import LocalStorage from 'components/LocalStorage'
import Geolocation from 'components/Geolocation'
import TrackGeolocation from 'components/TrackGelocation'
import Environment from 'consts/environment'
import CartProvider from 'contexts/cart'
import DelayActionProvider from 'contexts/delayAction'
import theme from '../theme'
import 'normalize.css'
import 'styles/globals.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={dateMomentUtils}>
          <StorageProvider storage={new Storage(LocalStorage, Environment)}>
            <AppProvider>
              <CartProvider>
                <DelayActionProvider>
                  <AuthDialogProvider>
                    <AppointmentsProvider>
                      <GeolocationProvider geolocation={Geolocation}>
                        <TrackGeolocation />
                        <Component {...pageProps} />
                      </GeolocationProvider>
                    </AppointmentsProvider>
                  </AuthDialogProvider>
                </DelayActionProvider>
              </CartProvider>
            </AppProvider>
          </StorageProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
