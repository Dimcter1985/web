import React from 'react'
import stylesBlock from 'utils/stylesBlock'

import FooterLink from '../../components/FooterLink'
import FooterText from '../../components/FooterText'

import styles from './services.module.scss'

const b = stylesBlock(styles)

const Services: React.FC = () => (
  <div className={b('footer')}>
    <FooterText variant='head'>services</FooterText>
    <FooterLink href='/search?query=manicure'>Manicure</FooterLink>
    <FooterLink href='/search?query=pedicure'>Pedicure</FooterLink>
    <FooterLink href='/search?query=spa'>Spa</FooterLink>
    <FooterLink href='/search?query=massage'>Massage</FooterLink>
    <FooterLink href='/search?query=waxing'>Waxing</FooterLink>
  </div>
)

export default Services