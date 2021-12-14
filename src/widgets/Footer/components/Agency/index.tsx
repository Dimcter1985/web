import React from 'react'

import ExternalLink from 'components/ExternalLink'
import Marker from './assets/Marker'
import Heart from './assets/Heart'
import FooterText from '../../components/FooterText'
import styles from './agency.module.scss'

const Agency: React.FC = () => (
  <div className={styles.root}>
    <FooterText variant='agency'>
      Built with
      <Heart className={styles.heart} />
      by
      <Marker className={styles.marker} />
      <ExternalLink href='https://digitaldesign.nyc'>digitaldesign.nyc</ExternalLink>
    </FooterText>
  </div>
)

export default Agency
