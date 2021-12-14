import React from 'react'

import {
  FAQ_PATH,
  ACCESSIBILITY_STATMENT_PATH,
} from 'consts/pages'
import { BLOG_PATH } from 'consts'
import { FACEBOOK_URL, INSTAGRAM_URL, CONTACT_EMAIL } from 'core/consts'
import FooterLink from '../../components/FooterLink'
import FooterText from '../../components/FooterText'

import styles from './about.module.scss'

const Services: React.FC = () => (
  <div className={styles.root}>
    <FooterText variant='head'>about snailz</FooterText>
    <FooterLink href={BLOG_PATH}>BLOG</FooterLink>
    <FooterLink href={FAQ_PATH}>FAQs</FooterLink>
    <FooterLink href={`mailto:${CONTACT_EMAIL}`}>Contact Us</FooterLink>
    <FooterLink href={ACCESSIBILITY_STATMENT_PATH}>Accessibility Statement</FooterLink>
    <FooterLink external href={FACEBOOK_URL}>Facebook</FooterLink>
    <FooterLink external href={INSTAGRAM_URL}>Instagram</FooterLink>

  </div>
)

export default Services