import React from 'react'

import { APP_STORE_URL, GOOGLE_PLAY_URL } from 'core/consts'
import ExternalLink from 'components/ExternalLink'

import appStore1x from './assets/app_store@1x.png'
import appStore2x from './assets/app_store@2x.png'

import googlePlay1x from './assets/google_play@1x.png'
import googlePlay2x from './assets/google_play@2x.png'

import styles from './stores.module.scss'

const Stores: React.FC = () => (
  <div className={styles.root}>
    <ExternalLink className={styles.store} href={APP_STORE_URL}>
      <img
        src={appStore1x}
        srcSet={`${appStore2x} 2x`}
        alt='app store'
      />
    </ExternalLink>
    <ExternalLink href={GOOGLE_PLAY_URL}>
      <img
        src={googlePlay1x}
        srcSet={`${googlePlay2x} 2x`}
        alt='google play'
      />
    </ExternalLink>
  </div>
)

export default Stores
