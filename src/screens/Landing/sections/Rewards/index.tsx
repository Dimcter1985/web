import { REWARDS_PATH } from 'consts/pages'
import Container from 'components/Container'
import Gradient from 'components/Gradient'
import Link from 'components/Link'
import Button from 'components/Button'

import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import MobileSeparator from '../../components/MobileSeparator'

import styles from './rewards.module.scss'

const Rewards: React.FC = () => {
  return (
    <div className={styles.outer}>
      <Gradient position='right' />
      <Container className={styles.container}>
        <Title className={styles.title}>
          Snailz 
          <MobileSeparator />
          Rewards
        </Title>
        <Subtitle className={styles.subtitle}>
          Book conveniently at hundreds of local nail salons on our 
          app or website and receive 1 point for every $1 spent. Redeem 
          points for Snailz Cash towards any salon services.
        </Subtitle>
        <Link 
          className={styles.link}
          href={REWARDS_PATH}
        >
          <Button className={styles.button}>
            Book and get rewarded now
          </Button>
        </Link>
      </Container>
    </div>
  )
}

export default Rewards
