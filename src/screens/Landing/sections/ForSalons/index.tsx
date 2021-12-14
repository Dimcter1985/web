import { FOR_SALONS_PATH } from 'consts/pages'
import BlackTheme from 'components/BlackTheme'
import Container from 'components/Container'
import Link from 'components/Link'
import Button from 'components/Button'

import MobileSeparator from '../../components/MobileSeparator'
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'

import styles from './forSalons.module.scss'

const ForSalons: React.FC = () => {
  return (
    <BlackTheme className={styles.outer}>
      <Container className={styles.container}>
        <Title className={styles.title}>
          DO you OWN a 
          <MobileSeparator />
          salon?
        </Title>
        <Subtitle className={styles.subtitle} color='textSecondary'>
          Find out how you can 
          <MobileSeparator />
          grow your business 
          <MobileSeparator />
          with Snailz
        </Subtitle>
        <Link 
          className={styles.link} 
          href={FOR_SALONS_PATH}
        >
          <Button 
            color='secondary' 
            className={styles.button}
          >
            Get started
          </Button>
        </Link>
      </Container>
    </BlackTheme>
  )
}

export default ForSalons
