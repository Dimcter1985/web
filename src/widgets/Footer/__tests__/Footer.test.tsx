import React from 'react'
import { def } from 'core/spec'
import { render } from 'test'
import Footer from '..'

describe('Footer', () => {
  def('subject', () => render(
    <Footer />
  ))

  it('renders correctly', () => {
    expect(get.subject).toHasText('services')
    expect(get.subject).toHasText('Manicure')
    expect(get.subject).toHasText('Pedicure')
    expect(get.subject).toHasText('Spa')
    expect(get.subject).toHasText('Massage')
    expect(get.subject).toHasText('Waxing')
    expect(get.subject).toHasText('about snailz')
    expect(get.subject).toHasText('Accessibility Statement')
    expect(get.subject).toHasText('FAQs')
    expect(get.subject).toHasText('BLOG')
    expect(get.subject).toHasText('Contact Us')
    expect(get.subject).toHasText('Facebook')
    expect(get.subject).toHasText('Instagram')
    expect(get.subject).toHasText(/Copyright/)
    expect(get.subject).toHasText(/Snailz, Inc\./)
    expect(get.subject).toHasText(/All rights reserved/)
    expect(get.subject).toHasText('Terms')
    expect(get.subject).toHasText('Privacy')
    expect(get.subject).toHasText(/Built with/)
    expect(get.subject).toHasText(/by/)
    expect(get.subject).toHasText(/digitaldesign.nyc/)
    expect(get.subject).toHasText(/Stay up to date about/)
    expect(get.subject).toHasText('SIGN ME UP')
  })
})