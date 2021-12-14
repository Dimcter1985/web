import React from 'react'

import { LANDING_PATH } from 'consts/pages'
import Snailz from 'components/Svg/Snailz'
import RouterLink from 'components/RouterLink'
import styles from './styles.module.scss'

const HeaderLogo: React.FC = () => (
  <div className={styles.container}>
    <RouterLink 
      href={LANDING_PATH}
      variant='touch'
    >
      <Snailz width='100%' className={styles.logo} data-testid='snailz-logo' />
    </RouterLink>
  </div>
)

export default HeaderLogo
