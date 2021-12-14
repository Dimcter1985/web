import React from 'react'

import { HeaderProvider } from 'contexts/header'
import AuthDialog from 'contexts/AuthDialog'
import { def, get } from 'core/spec'
import App from 'core/contexts/App'
import { render } from 'test'
import HeaderMobileMenu from '..'

describe('HeaderMobileMenu', () => {
  def('appContext', () => ({
    isLogged: get.isLogged,
  }))

  def('authContext', () => ({
    show: jest.fn(),
  }))

  def('subject', () => render(
    <App.Provider value={get.appContext}>
      <AuthDialog.Provider value={get.authContext}>
        <HeaderProvider>
          <HeaderMobileMenu />
        </HeaderProvider>
      </AuthDialog.Provider>
    </App.Provider>
  ))

  it('renders correctly', () => {
    expect(get.subject).toHasText('Rewards')
    expect(get.subject).toHasText('Gift Cards')
    expect(get.subject).toHasText('How Snailz Works')
    expect(get.subject).toHasText('For Salons')
  })
})