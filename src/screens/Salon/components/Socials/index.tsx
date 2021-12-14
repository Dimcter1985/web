import Link from 'components/Link'
import FacebookIcon from 'components/SocialsIcons/Facebook'
import Instagramm from 'components/SocialsIcons/Instagramm'

import Caption from '../Caption'

import styles from './socials.module.scss'

const Socials: React.FC = () => {
  return (
    <>
      <Caption>Social Media</Caption>
      <div className={styles.iconsGroup}>
        <div className={styles.iconWrapper}>
          <Link 
            href='https://www.facebook.com/snailzapp/'
            blank
            touch
          >
            <FacebookIcon />
          </Link>
        </div>
        <Link 
          href='https://www.instagram.com/snailzapp/'
          blank
          touch
        >
          <Instagramm />
        </Link>
      </div>
    </>
  )
}

export default Socials
