
import BlackTheme from 'components/BlackTheme'
import Container from 'components/Container'
import SalonCard from 'components/SalonCard'
import MultiCarousel from 'components/MultiCarousel'
import Button from 'components/Button'
import RouterLink from 'components/RouterLink'
import useInitValues from 'screens/Landing/hooks/useInitialValues'
import buildSalonLink from 'utils/buildSalonLink'

import styles from './topSalons.module.scss'

const responsive = {
  default: {
    breakpoint: { max: Number.MAX_VALUE, min: 0 },
    items: 1,
    partialVisibilityGutter: 35,
  },
}

const TopSalons: React.FC = () => {

  const { topBookedSalons } = useInitValues()

  return (
    <BlackTheme>
      <Container>
        <div className={styles.content}>
          <div className={styles.cardsGrid}>
            { topBookedSalons.map((salon) => (
              <RouterLink
                key={salon.id}
                className={styles.salonCard}
                href={buildSalonLink(salon.slug)}
                variant='touch'
              >
                <SalonCard key={salon.id} salon={salon} />
              </RouterLink>
            ))}
          </div>
          <MultiCarousel
            className={styles.salonsCarousel}
            partialVisible
            responsive={responsive}
          >
            { topBookedSalons.map((salon) => (
              <RouterLink
                key={salon.id}
                className={styles.salonCard}
                href={buildSalonLink(salon.slug)}
                variant='touch'
              >
                <SalonCard key={salon.id} salon={salon} />
              </RouterLink>
            ))}
          </MultiCarousel>
          <RouterLink
            href='/search'
            variant='touch'
            className={styles.link}
          >
            <Button 
              className={styles.button}
              color='secondary'
            >
              View All Salons 
            </Button>
          </RouterLink>
        </div>
      </Container>
    </BlackTheme>
  )
}

export default TopSalons
