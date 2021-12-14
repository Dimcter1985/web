import BlackTheme from 'components/BlackTheme'
import Container from 'components/Container'
import useInitValues from 'screens/Landing/hooks/useInitialValues'

import SalonCardLink from './components/SalonCardLink'
import CardsGroup from './components/CardsGroup'
import Title from '../../components/Title'

import styles from './featuredSalons.module.scss'

const FeaturedSalons: React.FC = () => {

  const { featuredSalons } = useInitValues()

  return (
    <BlackTheme className={styles.outer}>
      <Container>
        <Title className={styles.title}>
          Featured Salons
        </Title>
        <CardsGroup>
          { featuredSalons.map((salon) => (
            <SalonCardLink key={salon.id} salon={salon} />
          )) }
        </CardsGroup>
      </Container>
    </BlackTheme>
  )
}

export default FeaturedSalons
