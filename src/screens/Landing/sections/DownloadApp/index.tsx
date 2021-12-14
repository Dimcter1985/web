import Container from 'components/Container'

import GooglePlayLink from 'components/GooglePlayLink'
import AppStoreLink from 'components/AppStoreLink'

import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'

import qr1x from './images/qr@1x.png'
import qr2x from './images/qr@2x.png'

import styles from './downloadApp.module.scss'

const DownloadApp: React.FC = () => {
  return (
    <div className={styles.outer}>
      <Container className={styles.container}>
        <div className={styles.content}>
          <Title className={styles.title}>
            Download our app
          </Title>
          <Subtitle className={styles.subtitle}>
            For a quicker a easier access to your 
            next appointment. Touchless payments 
            and Cashless experiances
          </Subtitle>
          <div className={styles.linksGroup}>
            <img 
              className={styles.qrImage}
              src={qr1x}
              srcSet={`${qr2x} 2x`}
              alt='qr code'
            />
            <div className={styles.appsLinks}>
              <AppStoreLink className={styles.appStore} />
              <GooglePlayLink />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DownloadApp
