import React from 'react'

import {
  PRIVACY_PATH,
  TERMS_PATH,
} from 'consts/pages' 

import FooterText from '../../components/FooterText'
import FooterLink from '../../components/FooterLink'

import styles from './copyright.module.scss'

const Copyright: React.FC = () => (
  <div className={styles.root}>
    <FooterText>
      Copyright © {new Date().getFullYear()} Snailz, Inc.<br />All rights reserved
      {' | '}
      <FooterLink href={TERMS_PATH} className={styles.text}>Terms</FooterLink>
      {' | '}
      <FooterLink href={PRIVACY_PATH} className={styles.text}>Privacy</FooterLink>
    </FooterText>
  </div>
)

export default Copyright