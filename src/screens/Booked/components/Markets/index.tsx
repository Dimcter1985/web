import stylesBlock from 'utils/stylesBlock'
import ExternalLink from 'components/ExternalLink'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from 'core/consts'

import appSoreSrc from './images/app_store.png'
import googlePlaySrc from './images/google_play.png'
import styles from './markets.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const Markets: React.FC<IProps> = ({ className }) => {
  return (
    <div className={b('container', className)}>
      <ExternalLink href={APP_STORE_URL} className={styles.image}>
        <img src={appSoreSrc} alt='appstore' />
      </ExternalLink>
      <ExternalLink href={GOOGLE_PLAY_URL} className={styles.image}>
        <img src={googlePlaySrc} alt='google play' />
      </ExternalLink>
    </div>
  )
}

export default Markets
